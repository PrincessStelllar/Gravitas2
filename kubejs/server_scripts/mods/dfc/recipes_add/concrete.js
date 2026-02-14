const dfcRecipeAddConcrete = (/** @type {Internal.RecipesEventJS} */ event) => {

  // === CONCRETE ITEM CREATION ===

  // Fluid Solidifier: liquid concrete + ingot mold → concrete brick item (3.9s = 78 ticks, 546 EU = 7 EU/t)
  event.recipes.gtceu
    .fluid_solidifier('concrete_brick_item')
    .inputFluids('gtceu:concrete 115')
    .notConsumable('gtceu:ingot_casting_mold')
    .itemOutputs('dfc:concrete/brick')
    .duration(78)
    .EUt(7)

  // Fluid Solidifier: liquid concrete + plate mold → concrete slab item (3.9s = 78 ticks, 546 EU = 7 EU/t)
  event.recipes.gtceu
    .fluid_solidifier('concrete_slab_item')
    .inputFluids('gtceu:concrete 115')
    .notConsumable('gtceu:plate_casting_mold')
    .itemOutputs('dfc:concrete/slab')
    .duration(78)
    .EUt(7)

  // Assembler: TFC aggregate + liquid concrete → plain concrete block (5s = 100 ticks, 3000 EU = 30 EU/t)
  event.recipes.gtceu
    .assembler('concrete_block_from_aggregate')
    .itemInputs('tfc:aggregate')
    .inputFluids('gtceu:concrete 144')
    .itemOutputs('dfc:concrete/smooth/plain')
    .duration(100)
    .EUt(30)

  // === CONCRETE DYEING ===

  // Chemical Bath: any concrete + white dye → white concrete (1s = 20 ticks, 140 EU = 7 EU/t)
  event.recipes.gtceu
    .chemical_bath('concrete_dye_white')
    .itemInputs('#forge:concretes')
    .inputFluids(Fluid.of('gtceu:white_dye', 18))
    .itemOutputs('minecraft:white_concrete')
    .duration(20)
    .EUt(7)

  // TFC Barrel: any concrete + dye fluid → colored concrete (50s = 1000 ticks)
  dfcColors.forEach(color => {
    event.custom({
      type: 'tfc:barrel_sealed',
      input_item: {
        ingredient: {
          tag: 'forge:concretes'
        }
      },
      input_fluid: {
        ingredient: `tfc:${color}_dye`,
        amount: 25
      },
      output_item: {
        item: `minecraft:${color}_concrete`
      },
      duration: 1000
    }).id(`gregitas:barrel/concrete_dye_${color}`)

    // Chemical Bath: any concrete slab + GT dye → colored concrete slab (1s = 20 ticks, 140 EU = 7 EU/t)
    event.recipes.gtceu
      .chemical_bath(`concrete_slab_dye_${color}`)
      .itemInputs('#dfc:concrete/slab')
      .inputFluids(Fluid.of(`gtceu:${color}_dye`, 18))
      .itemOutputs(`dfc:concrete/slab/${color}`)
      .duration(20)
      .EUt(7)
    
    // Chemical Bath: any concrete bricks + GT dye → colored concrete 1s (bricks = 20 ticks, 140 EU = 7 EU/t)
    event.recipes.gtceu
      .chemical_bath(`concrete_bricks_dye_${color}`)
      .itemInputs('#dfc:concrete/bricks')
      .inputFluids(Fluid.of(`gtceu:${color}_dye`, 18))
      .itemOutputs(`dfc:concrete/bricks/${color}`)
      .duration(20)
      .EUt(7)
  })

  // === GT CONCRETE BLEACHING ===

  // Chemical Bath: any concrete + chlorine → plain concrete (20s = 400 ticks, 800 EU = 2 EU/t, 20mb chlorine)
  event.recipes.gtceu
    .chemical_bath('concrete_bleach_to_plain')
    .itemInputs('#forge:concretes')
    .inputFluids(Fluid.of('gtceu:chlorine', 20))
    .itemOutputs('dfc:concrete/smooth/plain')
    .duration(400)
    .EUt(2)

  // Chemical Bath: any concrete slab + chlorine → plain concrete slab (20s = 400 ticks, 800 EU = 2 EU/t, 20mb chlorine)
  event.recipes.gtceu
    .chemical_bath('concrete_slab_bleach_to_plain')
    .itemInputs('#dfc:concrete/slab')
    .inputFluids(Fluid.of('gtceu:chlorine', 20))
    .itemOutputs('dfc:concrete/slab/plain')
    .duration(400)
    .EUt(2)

  // Chemical Bath: any concrete bricks + chlorine → plain concrete bricks (20s = 400 ticks, 800 EU = 2 EU/t, 20mb chlorine)
  event.recipes.gtceu
    .chemical_bath('concrete_bricks_bleach_to_plain')
    .itemInputs('#dfc:concrete/bricks')
    .inputFluids(Fluid.of('gtceu:chlorine', 20))
    .itemOutputs('dfc:concrete/bricks/plain')
    .duration(400)
    .EUt(2)
}
