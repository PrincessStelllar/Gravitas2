let dfcAddItemTags = (/** @type {TagEvent.Item} */ event) => {
  // Pewter plate tags
  event.add("forge:plates", "dfc:metal/sheet/pewter")
  event.add("forge:plates/pewter", "dfc:metal/sheet/pewter")
  event.add("forge:double_plates", "dfc:metal/double_sheet/pewter")
  event.add("forge:double_plates/pewter", "dfc:metal/double_sheet/pewter")
  
  dfcTileTypes.forEach(type => {
    dfcTileColors.forEach(color => {
      // Skip plain glazed (doesn't exist)
      if (type === 'glazed' && color === 'plain') return
      
      event.add(`gregitas:ceramic_tile_blocks/${type}`, `dfc:ceramic/tiles/${type}/${color}`)
      event.add(`gregitas:ceramic_tile_slabs/${type}`, `dfc:ceramic/tiles/${type}/${color}_slab`)
      event.add(`gregitas:ceramic_tile_stairs/${type}`, `dfc:ceramic/tiles/${type}/${color}_stairs`)
    })
  })
  
  // Colored brick tags for dyeing

  dfcColors.forEach(color => {
    event.add('gregitas:colored_brick_blocks', `dfc:ceramic/bricks/${color}`)
    event.add('gregitas:colored_brick_slabs', `dfc:ceramic/bricks/${color}_slab`)
    event.add('gregitas:colored_brick_stairs', `dfc:ceramic/bricks/${color}_stairs`)
    event.add('gregitas:colored_brick_walls', `dfc:ceramic/bricks/${color}_wall`)
  })

  // Ceramic shingle tags for dyeing

  dfcTileColors.forEach(color => {
    event.add('gregitas:ceramic_shingles', `dfc:ceramic/shingles/${color}`)
  })
}
