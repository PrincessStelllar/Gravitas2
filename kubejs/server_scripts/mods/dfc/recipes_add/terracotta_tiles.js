const dfcRecipeAddTerracottaTiles = (/** @type {Internal.RecipesEventJS} */ event) => {
  // === TERRACOTTA TILE ITEM CREATION ===

  // Smelting: any ceramic tile → terracotta_tile (10s = 200 ticks)
  event.smelting('gregitas:terracotta_tile', 'dfc:ceramic/tile')
    .cookingTime(200)

  // === TERRACOTTA TILE BLOCK CRAFTING ===

  // Normal terracotta tile
  event.shaped('4x dfc:ceramic/tiles/normal/terracotta_white', [
    'BAB',
    'AAA',
    'BAB'
  ], {
    A: 'gregitas:terracotta_tile',
    B: 'tfc:mortar'
  })

  // Small terracotta tile
  event.shaped('4x dfc:ceramic/tiles/small/terracotta_white', [
    'ABA',
    'BAB',
    'ABA'
  ], {
    A: 'gregitas:terracotta_tile',
    B: 'tfc:mortar'
  })

  dfcColors.forEach(color => {
    // Since white is the default, don't allow dyeing to it
    if (color == 'white') return
    
    event.shapeless(`8x dfc:ceramic/tiles/normal/terracotta_${color}`, [
      '8x dfc:ceramic/tiles/normal/terracotta_white',
      `#forge:dyes/${color}`
    ])
    
    event.shapeless(`8x dfc:ceramic/tiles/small/terracotta_${color}`, [
      '8x dfc:ceramic/tiles/small/terracotta_white',
      `#forge:dyes/${color}`
    ])
  })

  // === TERRACOTTA TILE BLOCK PROCESSING ===

  const terracottaTileTypes = ['normal', 'small']

  terracottaTileTypes.forEach(type => {
    dfcColors.forEach(color => {
      const baseBlock = `dfc:ceramic/tiles/${type}/terracotta_${color}`
      const slab = `${baseBlock}_slab`
      const stairs = `${baseBlock}_stairs`

      // Standard stairs and slabs recipes
      event.shaped(`6x ${slab}`, [
	'AAA'
      ], {
	A: baseBlock
      })

      event.shaped(`8x ${stairs}`, [
	'A  ',
	'AA ',
	'AAA'
      ], {
	A: baseBlock
      })

      // Extractor: 4 terracotta tiles blocks → 5 terracotta tiles (12s = 240 ticks, 480 EU = 2 EU/t)
      event.recipes.gtceu
	.extractor(`dfc_terracotta_tile_${type}_${color}_extract`)
	.itemInputs(`4x ${baseBlock}`)
	.itemOutputs('5x gregitas:terracotta_tile')
	.duration(240)
	.EUt(2)

      // Cutter with water: base block → 2 slabs (4s = 80 ticks, 640 EU = 8 EU/t)
      event.recipes.gtceu
        .cutter(`dfc_terracotta_tile_${type}_${color}_slab_water`)
        .itemInputs(baseBlock)
        .inputFluids(Fluid.of('minecraft:water', 4))
        .itemOutputs(`2x ${slab}`)
        .duration(80)
        .EUt(8)

      // Cutter with distilled water: base block → 2 slabs (3s = 60 ticks, 480 EU = 8 EU/t)
      event.recipes.gtceu
        .cutter(`dfc_terracotta_tile_${type}_${color}_slab_distilled_water`)
        .itemInputs(baseBlock)
        .inputFluids(Fluid.of('gtceu:distilled_water', 3))
        .itemOutputs(`2x ${slab}`)
        .duration(60)
        .EUt(8)

      // Cutter with lubricant: base block → 2 slabs (2s = 40 ticks, 320 EU = 8 EU/t)
      event.recipes.gtceu
        .cutter(`dfc_terracotta_tile_${type}_${color}_slab_lubricant`)
        .itemInputs(baseBlock)
        .inputFluids(Fluid.of('gtceu:lubricant', 1))
        .itemOutputs(`2x ${slab}`)
        .duration(40)
        .EUt(8)

      // Assembler: 3 base blocks + circuit 7 → 4 stairs (4s = 80 ticks, 640 EU = 8 EU/t)
      event.recipes.gtceu
        .assembler(`dfc_terracotta_tile_${type}_${color}_stairs`)
        .itemInputs(`3x ${baseBlock}`)
        .circuit(7)
        .itemOutputs(`4x ${stairs}`)
        .duration(80)
        .EUt(8)

      // Macerator: base block → 4 brick dust (3s = 60 ticks, 120 EU = 2 EU/t)
      event.recipes.gtceu
        .macerator(`dfc_terracotta_tile_${type}_${color}_dust`)
        .itemInputs(baseBlock)
        .itemOutputs('4x gtceu:brick_dust')
        .duration(60)
        .EUt(2)
    })
  })

  // === TERRACOTTA TILE DYEING ===

  const terracottaTileVariants = [
    { name: 'blocks', suffix: '' },
    { name: 'slabs', suffix: '_slab' },
    { name: 'stairs', suffix: '_stairs' }
  ]

  terracottaTileTypes.forEach(type => {
    terracottaTileVariants.forEach(variant => {
      dfcColors.forEach(color => {
	// Since white is the default, don't allow dyeing to it
	if (color == 'white') return

	// Dyeing recipes: any terracotta tile of this type + dye → colored tile (1s = 20 ticks, 140 EU = 7 EU/t)
        event.recipes.gtceu
          .chemical_bath(`dfc_terracotta_tile_${type}_${variant.name}_dye_${color}`)
          .itemInputs(`#gregitas:terracotta_tile_${variant.name}/${type}`)
          .inputFluids(Fluid.of(`gtceu:${color}_dye`, 18))
          .itemOutputs(`dfc:ceramic/tiles/${type}/terracotta_${color}${variant.suffix}`)
          .duration(20)
          .EUt(7)

        event.custom({
          type: 'tfc:barrel_sealed',
          input_item: {
            ingredient: {
              tag: `gregitas:terracotta_tile_${variant.name}/${type}`
            }
          },
          input_fluid: {
            ingredient: `tfc:${color}_dye`,
            amount: 25
          },
          output_item: {
            item: `dfc:ceramic/tiles/${type}/terracotta_${color}${variant.suffix}`
          },
          duration: 1000
        }).id(`gregitas:barrel/terracotta_tile_${type}_${variant.name}_dye_${color}`)
      })

      event.recipes.gtceu
        .chemical_bath(`dfc_terracotta_tiles_${type}_${variant.name}_bleach`)
        .itemInputs(`#gregitas:terracotta_tile_${variant.name}/${type}`)
        .inputFluids(Fluid.of('gtceu:chlorine', 50))
        .itemOutputs(`dfc:ceramic/tiles/${type}/terracotta_white${variant.suffix}`)
        .duration(400)
        .EUt(2)
    })
  })
}
