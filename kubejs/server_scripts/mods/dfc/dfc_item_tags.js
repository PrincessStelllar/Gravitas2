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

  // Terracotta tile tags for dyeing and processing

  const terracottaTileTypes = ['normal', 'small']

  terracottaTileTypes.forEach(type => {
    dfcColors.forEach(color => {
      event.add(`gregitas:terracotta_tile_blocks/${type}`, `dfc:ceramic/tiles/${type}/terracotta_${color}`)
      event.add(`gregitas:terracotta_tile_slabs/${type}`, `dfc:ceramic/tiles/${type}/terracotta_${color}_slab`)
      event.add(`gregitas:terracotta_tile_stairs/${type}`, `dfc:ceramic/tiles/${type}/terracotta_${color}_stairs`)
    })
  })

  // Terracotta brick tags for dyeing and processing

  dfcColors.forEach(color => {
    event.add('gregitas:terracotta_brick_blocks', `dfc:ceramic/bricks/terracotta_${color}`)
    event.add('gregitas:terracotta_brick_slabs', `dfc:ceramic/bricks/terracotta_${color}_slab`)
    event.add('gregitas:terracotta_brick_stairs', `dfc:ceramic/bricks/terracotta_${color}_stairs`)
    event.add('gregitas:terracotta_brick_walls', `dfc:ceramic/bricks/terracotta_${color}_wall`)
  })

  // Terracotta shingle tags for dyeing

  dfcColors.forEach(color => {
    event.add('gregitas:terracotta_shingles', `dfc:ceramic/shingles/terracotta_${color}`)
  })

  // Plaster block tags for bleaching

  dfcColors.forEach(color => {
    event.add('gregitas:plaster_blocks/smooth', `dfc:plaster/smooth/${color}`)
    event.add('gregitas:plaster_slabs/smooth', `dfc:plaster/smooth/${color}_slab`)
    event.add('gregitas:plaster_stairs/smooth', `dfc:plaster/smooth/${color}_stairs`)
    event.add('gregitas:plaster_blocks/pillar', `dfc:plaster/pillar/${color}`)
  })

  // Stone pillar tags for plaster recipes

  const tfcStones = [
    'granite', 'diorite', 'gabbro', 'shale', 'claystone', 'limestone',
    'conglomerate', 'dolomite', 'chert', 'chalk', 'rhyolite', 'basalt',
    'andesite', 'dacite', 'quartzite', 'slate', 'phyllite', 'schist',
    'gneiss', 'marble'
  ]

  const dfcStones = ['serpentine', 'travertine', 'arkose', 'blueschist', 'tuff']

  const allStones = tfcStones.concat(dfcStones)

  allStones.forEach(stone => {
    event.add('gregitas:stone_pillars', `dfc:rock/pillar/${stone}`)
  })

  // Concrete blocks tag for dyeing and bleaching
  event.add('forge:concretes', 'dfc:concrete/smooth/plain')
}
