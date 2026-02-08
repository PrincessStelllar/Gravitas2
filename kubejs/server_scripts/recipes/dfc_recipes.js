// priority 10

const dfcMetalsToReplace = [
  "bismuth", "bismuth_bronze", "black_bronze", "bronze", "brass",
  "copper", "gold", "nickel", "rose_gold", "silver", "tin", "zinc",
  "sterling_silver", "wrought_iron", "steel", "black_steel",
  "blue_steel", "red_steel", "aluminum", "lead", "platinum"
]

const dfcMetalsToRemove = ["lead", "aluminum", "alumina", "platinum"]

const dfcPowdersToRemove = dfcMetalsToReplace.concat(["cast_iron", "pewter", "alumina"])

const dfcRecipes = (/** @type {Internal.RecipesEventJS} */ event) => {
  // Remove redundant DFC metal recipes
  dfcMetalsToRemove.forEach((metal) => {
    event.remove({ id: `dfc:welding/${metal}_double_ingot` })
    event.remove({ id: `dfc:anvil/${metal}_sheet` })
    event.remove({ id: `dfc:welding/${metal}_double_sheet` })
    event.remove({ id: `dfc:anvil/${metal}_rod` })
  })

  // Remove DFC powder grinding recipes
  dfcPowdersToRemove.forEach((metal) => {
    event.remove({ id: `dfc:quern/${metal}_powder` })
  })

  // Map of metals with different naming between DFC and GregTech
  const metalNameMap = {
    "aluminum": "aluminium"
  }

  dfcMetalsToReplace.forEach((metal) => {
    const gtMetal = metalNameMap[metal] || metal

    // Replace DFC/TFC powders with GregTech dusts in DFC recipes
    event.replaceInput(
      { mod: 'dfc' },
      `dfc:metal/powder/${metal}`,
      `#forge:dusts/${gtMetal}`
    )
    event.replaceInput(
      { mod: 'dfc' },
      `tfc:metal/powder/${metal}`,
      `#forge:dusts/${gtMetal}`
    )

    // Remove original DFC metal block recipes
    event.remove({ id: `dfc:crafting/metal/bricks/${metal}` })
    event.remove({ id: `dfc:crafting/metal/cut/${metal}` })
    event.remove({ id: `dfc:crafting/metal/smooth/${metal}` })
    event.remove({ id: `dfc:crafting/metal/pillar/${metal}` })
    event.remove({ id: `dfc:crafting/metal/block/${metal}` })

    // Recreate with GregTech plates
    event.custom({
      type: 'tfc:damage_inputs_shapeless_crafting',
      recipe: {
        type: 'minecraft:crafting_shapeless',
        ingredients: [
          { tag: `forge:plates/${gtMetal}` },
          { tag: 'tfc:rock/bricks' },
          { tag: 'tfc:hammers' }
        ],
        result: { item: `dfc:metal/bricks/${metal}`, count: 8 }
      }
    }).id(`kubejs:dfc/metal/bricks/${metal}`)

    event.custom({
      type: 'tfc:damage_inputs_shapeless_crafting',
      recipe: {
        type: 'minecraft:crafting_shapeless',
        ingredients: [
          { tag: `forge:plates/${gtMetal}` },
          { tag: 'dfc:rock/tiles' },
          { tag: 'tfc:hammers' }
        ],
        result: { item: `dfc:metal/cut/${metal}`, count: 8 }
      }
    }).id(`kubejs:dfc/metal/cut/${metal}`)

    event.custom({
      type: 'tfc:damage_inputs_shapeless_crafting',
      recipe: {
        type: 'minecraft:crafting_shapeless',
        ingredients: [
          { tag: `forge:plates/${gtMetal}` },
          { tag: 'minecraft:planks' },
          { tag: 'tfc:hammers' }
        ],
        result: { item: `dfc:metal/smooth/${metal}`, count: 8 }
      }
    }).id(`kubejs:dfc/metal/smooth/${metal}`)

    event.custom({
      type: 'tfc:damage_inputs_shapeless_crafting',
      recipe: {
        type: 'minecraft:crafting_shapeless',
        ingredients: [
          { tag: `forge:plates/${gtMetal}` },
          { tag: 'dfc:rock/pillars' },
          { tag: 'tfc:hammers' }
        ],
        result: { item: `dfc:metal/pillar/${metal}`, count: 8 }
      }
    }).id(`kubejs:dfc/metal/pillar/${metal}`)

    event.custom({
      type: 'tfc:damage_inputs_shapeless_crafting',
      recipe: {
        type: 'minecraft:crafting_shapeless',
        ingredients: [
          { tag: `forge:plates/${gtMetal}` },
          { tag: 'tfc:rock/smooth' },
          { tag: 'tfc:hammers' }
        ],
        result: { item: `dfc:metal/block/${metal}`, count: 8 }
      }
    }).id(`kubejs:dfc/metal/block/${metal}`)
  })

  // Pewter plate processing recipes
  // Create press: ingot → plate
  event.recipes.create.pressing(
    'dfc:metal/sheet/pewter',
    ['dfc:metal/ingot/pewter']
  ).id('gregitas:pressing/pewter_plate')

  // GregTech forge hammer: 3 ingots → 2 plates
  event.recipes.gtceu
    .forge_hammer('pewter_ingot_to_plate')
    .itemInputs('3x dfc:metal/ingot/pewter')
    .itemOutputs('2x dfc:metal/sheet/pewter')
    .duration(100)
    .EUt(8)

  // GregTech bender: ingot → plate
  event.recipes.gtceu
    .bender('pewter_ingot_to_plate_bender')
    .itemInputs('dfc:metal/ingot/pewter')
    .itemOutputs('dfc:metal/sheet/pewter')
    .circuit(1)
    .duration(100)
    .EUt(24)

  // GregTech extruder: ingot + plate mold → plate
  event.recipes.gtceu
    .extruder('pewter_ingot_to_plate_extruder')
    .itemInputs('dfc:metal/ingot/pewter')
    .notConsumable('gtceu:plate_extruder_mold')
    .itemOutputs('dfc:metal/sheet/pewter')
    .duration(100)
    .EUt(64)

  // GregTech cutter: ingot → plate
  event.recipes.gtceu
    .cutter('pewter_ingot_to_plate_cutter')
    .itemInputs('dfc:metal/ingot/pewter')
    .inputFluids(Fluid.of('gtceu:lubricant', 1))
    .itemOutputs('dfc:metal/sheet/pewter')
    .duration(40)
    .EUt(32)

  // GregTech fluid solidifier: molten pewter + plate mold → plate
  event.recipes.gtceu
    .fluid_solidifier('pewter_fluid_to_plate')
    .inputFluids('dfc:metal/dfc_pewter 144')
    .notConsumable('gtceu:plate_casting_mold')
    .itemOutputs('dfc:metal/sheet/pewter')
    .duration(60)
    .EUt(8)

  // Heated Create press: 2 ingots + flux → double ingot
  event.custom({
    type: 'create:compacting',
    ingredients: [
      {
        item: 'dfc:metal/ingot/pewter',
        count: 2
      },
      {
        item: 'tfc:powder/flux',
        count: 1
      }
    ],
    results: [
      {
        item: 'dfc:metal/double_ingot/pewter',
        count: 1
      }
    ],
    heatRequirement: 'superheated'
  }).id('gregitas:heated_pressing/double_ingot/pewter')

  // GregTech bender: 2 sheets → double sheet
  event.recipes.gtceu
    .bender('pewter_sheets_to_double_sheet')
    .itemInputs('2x dfc:metal/sheet/pewter')
    .itemOutputs('dfc:metal/double_sheet/pewter')
    .circuit(2)
    .duration(100)
    .EUt(24)

  // Pewter rod processing recipes
  // Create rolling: 1 ingot → 2 rods
  event.recipes.createaddition.rolling(
    Item.of('dfc:metal/rod/pewter', 2),
    'dfc:metal/ingot/pewter'
  ).id('gregitas:rolling/pewter_rod')

  // GregTech extruder: 1 ingot + rod mold → 2 rods
  event.recipes.gtceu
    .extruder('pewter_ingot_to_rod_extruder')
    .itemInputs('dfc:metal/ingot/pewter')
    .notConsumable('gtceu:rod_extruder_mold')
    .itemOutputs('2x dfc:metal/rod/pewter')
    .duration(100)
    .EUt(64)

  // GregTech lathe: 1 ingot → 2 rods
  event.recipes.gtceu
    .lathe('pewter_ingot_to_rod_lathe')
    .itemInputs('dfc:metal/ingot/pewter')
    .itemOutputs('2x dfc:metal/rod/pewter')
    .duration(100)
    .EUt(8)
}
