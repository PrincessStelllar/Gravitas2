const dfcRecipeAddTerracottaShingles = (/** @type {Internal.RecipesEventJS} */ event) => {
  // Smelting: shingle → terracotta_shingle (10s = 200 ticks)
  event.smelting('gregitas:terracotta_shingle', 'dfc:ceramic/shingle')
    .cookingTime(200)

  event.shaped('4x dfc:ceramic/shingles/terracotta_white', [
    '  A',
    ' AB',
    'ABA'
  ], {
    A: 'gregitas:terracotta_shingle',
    B: 'tfc:mortar'
  })

  // === TERRACOTTA SHINGLE BLOCK PROCESSING ===

  dfcColors.forEach(color => {
    const baseBlock = `dfc:ceramic/shingles/terracotta_${color}`

    // Extractor: terracotta shingles → terracotta shingle (3s = 60 ticks, 120 EU = 2 EU/t)
      event.recipes.gtceu
	.extractor(`dfc_terracotta_shingles_${color}_extract`)
	.itemInputs(baseBlock)
	.itemOutputs('gregitas:terracotta_shingle')
	.duration(60)
	.EUt(2)

    // Macerator: base block → 4 brick dust (3s = 60 ticks, 120 EU = 2 EU/t)
    event.recipes.gtceu
      .macerator(`dfc_terracotta_shingle_${color}_dust`)
      .itemInputs(baseBlock)
      .itemOutputs('4x gtceu:brick_dust')
      .duration(60)
      .EUt(2)
  })

  // === TERRACOTTA SHINGLE DYEING ===

  // Dyeing recipes: any terracotta shingle + dye → colored shingle (1s = 20 ticks, 140 EU = 7 EU/t)
  dfcColors.forEach(color => {
    if (color == 'white') return
    
    event.shapeless(`8x dfc:ceramic/shingles/terracotta_${color}`, [
      '8x dfc:ceramic/shingles/terracotta_white',
      `#forge:dyes/${color}`	
    ])

    event.recipes.gtceu
      .chemical_bath(`dfc_terracotta_shingle_dye_${color}`)
      .itemInputs('#gregitas:terracotta_shingles')
      .inputFluids(Fluid.of(`gtceu:${color}_dye`, 18))
      .itemOutputs(`dfc:ceramic/shingles/terracotta_${color}`)
      .duration(20)
      .EUt(7)

    event.custom({
      type: 'tfc:barrel_sealed',
      input_item: {
        ingredient: {
          tag: 'gregitas:terracotta_shingles'
        }
      },
      input_fluid: {
        ingredient: `tfc:${color}_dye`,
        amount: 25
      },
      output_item: {
        item: `dfc:ceramic/shingles/terracotta_${color}`
      },
      duration: 1000
    }).id(`gregitas:barrel/terracotta_shingle_dye_${color}`)
  })

  event.recipes.gtceu
    .chemical_bath(`dfc_terracotta_shingles_bleach`)
    .itemInputs(`#gregitas:terracotta_shingles`)
    .inputFluids(Fluid.of('gtceu:chlorine', 50))
    .itemOutputs(`dfc:ceramic/shingles/terracotta_white`)
    .duration(400)
    .EUt(2)
}
