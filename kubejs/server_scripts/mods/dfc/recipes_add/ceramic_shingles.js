const dfcRecipeAddCeramicShingles = (/** @type {Internal.RecipesEventJS} */ event) => {
  // === CERAMIC SHINGLE RECIPES ===

  // Forming Press: 1 clay ball + cylinder mold → 1 unfired shingle (5s, 800 EU)
  event.recipes.gtceu
    .forming_press('unfired_shingle_from_clay')
    .notConsumable('gtceu:cylinder_casting_mold')
    .itemInputs('minecraft:clay_ball')
    .itemOutputs('dfc:ceramic/unfired_shingle')
    .duration(100)
    .EUt(8)

  // Create Vintage Curving: 1 clay ball + cylinder mold → 1 unfired shingle
  event.recipes.vintage.curving(
    'dfc:ceramic/unfired_shingle',
    'minecraft:clay_ball',
    'gtceu:cylinder_casting_mold'
  ).id('gregitas:curving/unfired_shingle')

  // Alloy Smelter: 4 clay balls + cylinder mold → 4 fired shingles (4s, 2400 EU)
  event.recipes.gtceu
    .alloy_smelter('shingle_from_clay')
    .itemInputs('4x minecraft:clay_ball')
    .notConsumable('gtceu:cylinder_casting_mold')
    .itemOutputs('4x dfc:ceramic/shingle')
    .duration(80)
    .EUt(30)

  // Smelting: unfired shingle → fired shingle (10s = 200 ticks)
  event.smelting('dfc:ceramic/shingle', 'dfc:ceramic/unfired_shingle')
    .cookingTime(200)

  // === CERAMIC SHINGLE BLOCK PROCESSING ===

  dfcTileColors.forEach(color => {
    // Macerator: base block → 4 brick dust (3s = 60 ticks, 120 EU = 2 EU/t)
    event.recipes.gtceu
      .macerator(`dfc_shingle_${color}_dust`)
      .itemInputs(`dfc:ceramic/shingles/${color}`)
      .itemOutputs('4x gtceu:brick_dust')
      .duration(60)
      .EUt(2)
  })

  // === CERAMIC SHINGLE DYEING ===

  // Dyeing recipes: any shingle + dye → colored shingle (1s = 20 ticks, 140 EU = 7 EU/t)
  dfcColors.forEach(color => {
    event.recipes.gtceu
      .chemical_bath(`dfc_shingle_dye_${color}`)
      .itemInputs('#gregitas:ceramic_shingles')
      .inputFluids(Fluid.of(`gtceu:${color}_dye`, 18))
      .itemOutputs(`dfc:ceramic/shingles/${color}`)
      .duration(20)
      .EUt(7)

    event.custom({
      type: 'tfc:barrel_sealed',
      input_item: {
        ingredient: {
          tag: 'gregitas:ceramic_shingles'
        }
      },
      input_fluid: {
        ingredient: `tfc:${color}_dye`,
        amount: 25
      },
      output_item: {
        item: `dfc:ceramic/shingles/${color}`
      },
      duration: 1000
    }).id(`gregitas:barrel/shingle_dye_${color}`)
  })

  // Bleaching: colored shingle → plain shingle (20s = 400 ticks, 800 EU = 2 EU/t)
  event.recipes.gtceu
    .chemical_bath('dfc_shingles_bleach')
    .itemInputs('#gregitas:ceramic_shingles')
    .inputFluids(Fluid.of('gtceu:chlorine', 50))
    .itemOutputs('dfc:ceramic/shingles/plain')
    .duration(400)
    .EUt(2)
}
