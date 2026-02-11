const dfcRecipeAddCeramicTile = (/** @type {Internal.RecipesEventJS} */ event) => {

  // === CERAMIC TILE ===
  
  // Forming Press: 1 clay ball + plate mold → 1 unfired tile (5s, 800 EU)
  event.recipes.gtceu
    .forming_press('unfired_tile_from_clay')
    .notConsumable('gtceu:plate_casting_mold')
    .itemInputs('minecraft:clay_ball')
    .itemOutputs('dfc:ceramic/unfired_tile')
    .duration(100)
    .EUt(8)

  // Create Vintage Curving: 1 clay ball + plate mold → 1 unfired tile
  event.recipes.vintage.curving(
    'dfc:ceramic/unfired_tile',
    'minecraft:clay_ball',
    'gtceu:plate_casting_mold'
  ).id('gregitas:curving/unfired_tile')

  // Alloy Smelter: 4 clay balls + plate mold → 4 fired tiles (4s, 2400 EU)
  event.recipes.gtceu
    .alloy_smelter('tile_from_clay')
    .itemInputs('4x minecraft:clay_ball')
    .notConsumable('gtceu:plate_casting_mold')
    .itemOutputs('4x dfc:ceramic/tile')
    .duration(80)
    .EUt(30)

  // Smelting: unfired tile → fired tile (10s = 200 ticks)
  event.smelting('dfc:ceramic/tile', 'dfc:ceramic/unfired_tile')
    .cookingTime(200)

  // === DFC CERAMIC TILE BLOCK PROCESSING ===

  dfcTileTypes.forEach(type => {
    dfcTileColors.forEach(color => {

      // There is no plain glazed tiles
      if (type == "glazed" && color == "plain") {
	return
      }
      
      const baseBlock = `dfc:ceramic/tiles/${type}/${color}`
      const slab = `${baseBlock}_slab`
      const stairs = `${baseBlock}_stairs`

      // Extractor: 4 tile blocks → 5 tiles (12s = 240 ticks, 480 EU = 2 EU/t)
      event.recipes.gtceu
	.extractor(`dfc_ceramic_tile_${type}_${color}_extract`)
	.itemInputs(`4x ${baseBlock}`)
	.itemOutputs('5x dfc:ceramic/tile')
	.duration(240)
	.EUt(2)

      // Cutter with water: base block → 2 slabs (4s = 80 ticks, 640 EU = 8 EU/t)
      event.recipes.gtceu
        .cutter(`dfc_${type}_${color}_tile_slab_water`)
        .itemInputs(baseBlock)
        .inputFluids(Fluid.of('minecraft:water', 4))
        .itemOutputs(`2x ${slab}`)
        .duration(80)
        .EUt(8)

      // Cutter with distilled water: base block → 2 slabs (3s = 60 ticks, 480 EU = 8 EU/t)
      event.recipes.gtceu
        .cutter(`dfc_${type}_${color}_tile_slab_distilled_water`)
        .itemInputs(baseBlock)
        .inputFluids(Fluid.of('gtceu:distilled_water', 3))
        .itemOutputs(`2x ${slab}`)
        .duration(60)
        .EUt(8)

      // Cutter with lubricant: base block → 2 slabs (2s = 40 ticks, 320 EU = 8 EU/t)
      event.recipes.gtceu
        .cutter(`dfc_${type}_${color}_tile_slab_lubricant`)
        .itemInputs(baseBlock)
        .inputFluids(Fluid.of('gtceu:lubricant', 1))
        .itemOutputs(`2x ${slab}`)
        .duration(40)
        .EUt(8)

      // Assembler: 3 base blocks + circuit 7 → 4 stairs (4s = 80 ticks, 640 EU = 8 EU/t)
      event.recipes.gtceu
        .assembler(`dfc_${type}_${color}_tile_stairs`)
        .itemInputs(`3x ${baseBlock}`)
        .circuit(7)
        .itemOutputs(`4x ${stairs}`)
        .duration(80)
        .EUt(8)

      // Macerator: base block → 4 brick dust (3s = 60 ticks, 120 EU = 2 EU/t)
      event.recipes.gtceu
        .macerator(`dfc_${type}_${color}_tile_dust`)
        .itemInputs(baseBlock)
        .itemOutputs('4x gtceu:brick_dust')
        .duration(60)
        .EUt(2)
    })
  })
  
  // === CERAMIC TILE DYEING ===

  const tileVariants = [
    { name: 'blocks', suffix: '' },
    { name: 'slabs', suffix: '_slab' },
    { name: 'stairs', suffix: '_stairs' }
  ]

  dfcTileTypes.forEach(type => {
    tileVariants.forEach(variant => {
      // Dyeing recipes: any tile of this type + dye → colored tile (1s = 20 ticks, 140 EU = 7 EU/t)
      dfcColors.forEach(color => {
        event.recipes.gtceu
          .chemical_bath(`dfc_tile_${type}_${variant.name}_dye_${color}`)
          .itemInputs(`#gregitas:ceramic_tile_${variant.name}/${type}`)
          .inputFluids(Fluid.of(`gtceu:${color}_dye`, 18))
          .itemOutputs(`dfc:ceramic/tiles/${type}/${color}${variant.suffix}`)
          .duration(20)
          .EUt(7)

	event.custom({
          type: 'tfc:barrel_sealed',
          input_item: {
            ingredient: {
              tag: `gregitas:ceramic_tile_${variant.name}/${type}`
            }
          },
          input_fluid: {
            ingredient: `tfc:${color}_dye`,
            amount: 25
          },
          output_item: {
            item: `dfc:ceramic/tiles/${type}/${color}${variant.suffix}`
          },
          duration: 1000
        }).id(`gregitas:barrel/tile_${type}_${variant.name}_dye_${color}`)
      })

      // Bleaching: colored tile → plain tile (20s = 400 ticks, 800 EU = 2 EU/t)
      // Glazed tiles don't have a plain variant
      if (type !== 'glazed') {
        event.recipes.gtceu
          .chemical_bath(`dfc_tile_${type}_${variant.name}_bleach`)
          .itemInputs(`#gregitas:ceramic_tile_${variant.name}/${type}`)
          .inputFluids(Fluid.of('gtceu:chlorine', 50))
          .itemOutputs(`dfc:ceramic/tiles/${type}/plain${variant.suffix}`)
          .duration(400)
          .EUt(2)
      }
    })
  })
}
