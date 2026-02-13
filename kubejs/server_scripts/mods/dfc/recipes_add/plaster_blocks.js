const dfcRecipeAddPlasterBlocks = (/** @type {Internal.RecipesEventJS} */ event) => {

  // === PLASTER FLUID CREATION ===
  
  // TFC Barrel: gypsum dust + water → plaster fluid
  event.custom({
    type: 'tfc:barrel_instant',
    input_item: {
      ingredient: {
        tag: 'forge:dusts/gypsum'
      }
    },
    input_fluid: {
      ingredient: 'minecraft:water',
      amount: 500
    },
    output_fluid: {
      fluid: 'dfc:plaster',
      amount: 500
    }
  }).id('gregitas:barrel/plaster_from_gypsum_dust')

  // LV Mixer: gypsum dust + water → plaster fluid
  // 320 EU over 1 second = 16 EU/t × 20 ticks
  event.recipes.gtceu
    .mixer('plaster_fluid_from_gypsum')
    .itemInputs('gtceu:gypsum_dust')
    .inputFluids(Fluid.of('minecraft:water', 500))
    .outputFluids(Fluid.of('dfc:plaster', 576))
    .duration(20)
    .EUt(16)
  
  // === PLASTER BLOCKS - CREATE SPOUT INTEGRATION ===
  
  // Create Spout: spout applies plaster fluid to blocks → plaster blocks
  
  // Wood planks
  event.recipes.create
    .filling('dfc:plaster/smooth/plain', ['#minecraft:planks', Fluid.of('dfc:plaster', 40)])
    .id('gregitas:filling/plaster_smooth_from_planks')
  
  // Wooden stairs
  event.recipes.create
    .filling('dfc:plaster/smooth/plain_stairs', ['#minecraft:wooden_stairs', Fluid.of('dfc:plaster', 40)])
    .id('gregitas:filling/plaster_smooth_stairs_from_wood')
  
  // Wooden slabs
  event.recipes.create
    .filling('dfc:plaster/smooth/plain_slab', ['#minecraft:wooden_slabs', Fluid.of('dfc:plaster', 40)])
    .id('gregitas:filling/plaster_smooth_slab_from_wood')
  
  // Bricks
  event.recipes.create
    .filling('dfc:plaster/smooth/plain', ['minecraft:bricks', Fluid.of('dfc:plaster', 40)])
    .id('gregitas:filling/plaster_smooth_from_bricks')
  
  event.recipes.create
    .filling('dfc:plaster/smooth/plain_stairs', ['minecraft:brick_stairs', Fluid.of('dfc:plaster', 40)])
    .id('gregitas:filling/plaster_smooth_stairs_from_bricks')
  
  event.recipes.create
    .filling('dfc:plaster/smooth/plain_slab', ['minecraft:brick_slab', Fluid.of('dfc:plaster', 40)])
    .id('gregitas:filling/plaster_smooth_slab_from_bricks')

  // Stone pillars
  event.recipes.create
    .filling('dfc:plaster/pillar/plain', ['#gregitas:stone_pillars', Fluid.of('dfc:plaster', 40)])
    .id('gregitas:filling/plaster_pillar_from_stone')
  
  // === PLAIN PLASTER BLOCKS FROM WOOD ===

  // Chemical Bath: wood planks + plaster → plain smooth plaster (5s = 100 ticks, 800 EU = 8 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_from_planks')
    .itemInputs('#minecraft:planks')
    .inputFluids(Fluid.of('dfc:plaster', 40))
    .itemOutputs('dfc:plaster/smooth/plain')
    .duration(100)
    .EUt(8)

  // Chemical Bath: wooden stairs + plaster → plain smooth plaster stairs (5s = 100 ticks, 800 EU = 8 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_stairs_from_wood')
    .itemInputs('#minecraft:wooden_stairs')
    .inputFluids(Fluid.of('dfc:plaster', 40))
    .itemOutputs('dfc:plaster/smooth/plain_stairs')
    .duration(100)
    .EUt(8)

  // Chemical Bath: wooden slabs + plaster → plain smooth plaster slabs (5s = 100 ticks, 800 EU = 8 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_slab_from_wood')
    .itemInputs('#minecraft:wooden_slabs')
    .inputFluids(Fluid.of('dfc:plaster', 40))
    .itemOutputs('dfc:plaster/smooth/plain_slab')
    .duration(100)
    .EUt(8)

  // === PLAIN PLASTER BLOCKS FROM BRICKS ===

  // Chemical Bath: bricks + plaster → plain smooth plaster (5s = 100 ticks, 800 EU = 8 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_from_bricks')
    .itemInputs('minecraft:bricks')
    .inputFluids(Fluid.of('dfc:plaster', 40))
    .itemOutputs('dfc:plaster/smooth/plain')
    .duration(100)
    .EUt(8)

  // Chemical Bath: brick stairs + plaster → plain smooth plaster stairs (5s = 100 ticks, 800 EU = 8 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_stairs_from_bricks')
    .itemInputs('minecraft:brick_stairs')
    .inputFluids(Fluid.of('dfc:plaster', 40))
    .itemOutputs('dfc:plaster/smooth/plain_stairs')
    .duration(100)
    .EUt(8)

  // Chemical Bath: brick slab + plaster → plain smooth plaster slabs (5s = 100 ticks, 800 EU = 8 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_slab_from_bricks')
    .itemInputs('minecraft:brick_slab')
    .inputFluids(Fluid.of('dfc:plaster', 40))
    .itemOutputs('dfc:plaster/smooth/plain_slab')
    .duration(100)
    .EUt(8)

  // === PLAIN PLASTER PILLARS FROM STONE PILLARS ===

  // Chemical Bath: stone pillar + plaster → plain plaster pillar (5s = 100 ticks, 800 EU = 8 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_pillar_from_stone')
    .itemInputs('#gregitas:stone_pillars')
    .inputFluids(Fluid.of('dfc:plaster', 40))
    .itemOutputs('dfc:plaster/pillar/plain')
    .duration(100)
    .EUt(8)

  // === COLORED PLASTER BLOCKS VIA DYEING ===

  const plasterVariants = [
    { name: 'smooth', suffix: '' },
    { name: 'smooth', suffix: '_stairs' },
    { name: 'smooth', suffix: '_slab' },
    { name: 'pillar', suffix: '' }
  ]

  plasterVariants.forEach(variant => {
    dfcColors.forEach(color => {
      // Chemical Bath: plain plaster + GT dye → colored plaster (1s = 20 ticks, 140 EU = 7 EU/t)
      event.recipes.gtceu
        .chemical_bath(`plaster_${variant.name}_dye_${color}${variant.suffix}`)
        .itemInputs(`dfc:plaster/${variant.name}/plain${variant.suffix}`)
        .inputFluids(Fluid.of(`gtceu:${color}_dye`, 18))
        .itemOutputs(`dfc:plaster/${variant.name}/${color}${variant.suffix}`)
        .duration(20)
        .EUt(7)

      // TFC Barrel: plain plaster + dye fluid → colored plaster (50s = 1000 ticks)
      event.custom({
        type: 'tfc:barrel_sealed',
        input_item: {
          ingredient: { item: `dfc:plaster/${variant.name}/plain${variant.suffix}` }
        },
        input_fluid: {
          ingredient: `tfc:${color}_dye`,
          amount: 25
        },
        output_item: {
          item: `dfc:plaster/${variant.name}/${color}${variant.suffix}`
        },
        duration: 1000
      }).id(`gregitas:barrel/plaster_${variant.name}_dye_${color}${variant.suffix}`)
    })
  })

  // === PLASTER BLEACHING ===

  // Smooth blocks: colored plaster → plain plaster (20s = 400 ticks, 800 EU = 2 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_blocks_bleach')
    .itemInputs('#gregitas:plaster_blocks/smooth')
    .inputFluids(Fluid.of('gtceu:chlorine', 50))
    .itemOutputs('dfc:plaster/smooth/plain')
    .duration(400)
    .EUt(2)

  // Smooth stairs: colored plaster stairs → plain plaster stairs (20s = 400 ticks, 800 EU = 2 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_stairs_bleach')
    .itemInputs('#gregitas:plaster_stairs/smooth')
    .inputFluids(Fluid.of('gtceu:chlorine', 50))
    .itemOutputs('dfc:plaster/smooth/plain_stairs')
    .duration(400)
    .EUt(2)

  // Smooth slabs: colored plaster slabs → plain plaster slabs (20s = 400 ticks, 800 EU = 2 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_smooth_slabs_bleach')
    .itemInputs('#gregitas:plaster_slabs/smooth')
    .inputFluids(Fluid.of('gtceu:chlorine', 50))
    .itemOutputs('dfc:plaster/smooth/plain_slab')
    .duration(400)
    .EUt(2)

  // Pillar blocks: colored plaster pillar → plain plaster pillar (20s = 400 ticks, 800 EU = 2 EU/t)
  event.recipes.gtceu
    .chemical_bath('plaster_pillar_blocks_bleach')
    .itemInputs('#gregitas:plaster_blocks/pillar')
    .inputFluids(Fluid.of('gtceu:chlorine', 50))
    .itemOutputs('dfc:plaster/pillar/plain')
    .duration(400)
    .EUt(2)
}
