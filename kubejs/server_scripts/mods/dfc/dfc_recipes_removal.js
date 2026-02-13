// priority 10

const dfcRecipesRemoval = (/** @type {Internal.RecipesEventJS} */ event) => {
  // Remove redundant DFC metal recipes
  dfcMetalsToRemove.forEach((metal) => {
    event.remove({ id: `dfc:welding/${metal}_double_ingot` })
    event.remove({ id: `dfc:anvil/${metal}_sheet` })
    event.remove({ id: `dfc:welding/${metal}_double_sheet` })
    event.remove({ id: `dfc:anvil/${metal}_rod` })
  })

  // DFC - remove all recipes outputting DFC powders
  dfcAllMetals.forEach((metal) => {
    event.remove({ output: `dfc:metal/powder/${metal}` })
  })

  // Remove DFC gypsum powder recipes
  event.remove({ id: 'dfc:quern/gypsum_powder' })
  event.remove({ output: 'dfc:powder/gypsum' })
  event.remove({ id: 'dfc:barrel/plaster' })
}
