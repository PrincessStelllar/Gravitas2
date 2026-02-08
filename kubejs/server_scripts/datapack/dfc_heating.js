// priority 10

let addDFCHeatingRecipesViaEvent = (/** @type {Internal.RecipesEventJS} */ event) => {
  // DFC metals that have decorative blocks
  const dfcMetalNames = [
    "bismuth", "bismuth_bronze", "black_bronze", "bronze", "brass",
    "copper", "gold", "nickel", "rose_gold", "silver", "tin", "zinc",
    "sterling_silver", "wrought_iron", "steel", "black_steel",
    "blue_steel", "red_steel", "aluminum", "lead", "platinum",
    "cast_iron", "alumina", "pewter"
  ]

  const dfcMetals = dfcMetalNames.map(function(metalName) {
    const heatingData = global.metalHeatingData[metalName]
    if (!heatingData) {
      console.error(`Missing heating data for metal: ${metalName}`)
      return null
    }
    return { metal: metalName, fluid: heatingData.fluid, temp: heatingData.temp }
  }).filter(function(m) { return m !== null })

  const blockMetals = ["lead", "platinum", "pewter", "aluminum", "alumina"]
  const variants = ["smooth", "cut", "bricks", "pillar"]

  // Correct and add melt values for all DFC metal block variants
  dfcMetals.forEach(function(metalData) {
    var metal = metalData.metal
    var fluid = metalData.fluid
    var temp = metalData.temp

    variants.forEach(function(variant) {
      var blockId = "dfc:metal/" + variant + "/" + metal
      var recipeId = "kubejs:dfc/heating/" + metal + "_" + variant

      if (blockMetals.indexOf(metal) !== -1) {
        event.remove({ id: `dfc:heating/metal/${metal}/${variant}` })
        event.remove({ id: `dfc:heating/metal/${metal}/${variant}_slab` })
        event.remove({ id: `dfc:heating/metal/${metal}/${variant}_stairs` })
      } else {
        event.remove({ id: `dfc:heating/metal/${metal}_${variant}` })
        event.remove({ id: `dfc:heating/metal/${metal}_${variant}_slab` })
        event.remove({ id: `dfc:heating/metal/${metal}_${variant}_stairs` })
      }

      if (Item.exists(blockId)) {
        event.custom({
          type: "tfc:heating",
          ingredient: { item: blockId },
          result_fluid: { fluid: fluid, amount: 18 },
          temperature: temp
        }).id(recipeId)
      }

      if (Item.exists(blockId + "_slab")) {
        event.custom({
          type: "tfc:heating",
          ingredient: { item: blockId + "_slab" },
          result_fluid: { fluid: fluid, amount: 9 },
          temperature: temp
        }).id(recipeId + "_slab")
      }

      if (Item.exists(blockId + "_stairs")) {
        event.custom({
          type: "tfc:heating",
          ingredient: { item: blockId + "_stairs" },
          result_fluid: { fluid: fluid, amount: 13 },
          temperature: temp
        }).id(recipeId + "_stairs")
      }
    })

    if (blockMetals.indexOf(metal) !== -1) {
      var blockId = "dfc:metal/block/" + metal
      var recipeId = "kubejs:dfc/heating/" + metal + "_block"

      event.remove({ id: `dfc:heating/metal/${metal}/block` })
      event.remove({ id: `dfc:heating/metal/${metal}/block_slab` })
      event.remove({ id: `dfc:heating/metal/${metal}/block_stairs` })

      if (Item.exists(blockId)) {
        event.custom({
          type: "tfc:heating",
          ingredient: { item: blockId },
          result_fluid: { fluid: fluid, amount: 18 },
          temperature: temp
        }).id(recipeId)
      }

      if (Item.exists(blockId + "_slab")) {
        event.custom({
          type: "tfc:heating",
          ingredient: { item: blockId + "_slab" },
          result_fluid: { fluid: fluid, amount: 9 },
          temperature: temp
        }).id(recipeId + "_slab")
      }

      if (Item.exists(blockId + "_stairs")) {
        event.custom({
          type: "tfc:heating",
          ingredient: { item: blockId + "_stairs" },
          result_fluid: { fluid: fluid, amount: 13 },
          temperature: temp
        }).id(recipeId + "_stairs")
      }
    }
  })

  // Pewter sheet heating recipe
  const pewterData = dfcMetals.find(m => m.metal === "pewter")
  if (pewterData) {
    event.remove({ id: 'dfc:heating/metal/pewter/sheet' })

    // Sheet: 144 mb (1 ingot worth)
    if (Item.exists('dfc:metal/sheet/pewter')) {
      event.custom({
        type: "tfc:heating",
        ingredient: { item: 'dfc:metal/sheet/pewter' },
        result_fluid: { fluid: pewterData.fluid, amount: 144 },
        temperature: pewterData.temp
      }).id('kubejs:dfc/heating/pewter_sheet')
    }
  }

  // Cast iron sheet and rod heating recipes
  const castIronData = dfcMetals.find(m => m.metal === "cast_iron")
  if (castIronData) {
    event.remove({ id: 'tfc:heating/metal/sheet/cast_iron' })
    event.remove({ id: 'tfc:heating/metal/rod/cast_iron' })

    // Sheet: 144 mb (1 ingot worth)
    if (Item.exists('tfc:metal/sheet/cast_iron')) {
      event.custom({
        type: "tfc:heating",
        ingredient: { item: 'tfc:metal/sheet/cast_iron' },
        result_fluid: { fluid: castIronData.fluid, amount: 144 },
        temperature: castIronData.temp
      }).id('kubejs:tfc/heating/cast_iron_sheet')
    }

    // Rod: 72 mb (1/2 ingot worth)
    if (Item.exists('tfc:metal/rod/cast_iron')) {
      event.custom({
        type: "tfc:heating",
        ingredient: { item: 'tfc:metal/rod/cast_iron' },
        result_fluid: { fluid: castIronData.fluid, amount: 72 },
        temperature: castIronData.temp
      }).id('kubejs:tfc/heating/cast_iron_rod')
    }
  }
}
