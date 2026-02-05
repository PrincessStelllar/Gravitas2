const banIEMultiblocks = (event) => {
    let mbWhitelist = {
        "immersiveengineering" : [
            "feedthrough",
            "multiblocks/fermenter",
            "multiblocks/mixer",
            "multiblocks/squeezer"
        ],
        "advancedtfctech" : [],
        "immersivegeology" : [
            "multiblocks/alternator",
            "multiblocks/ballmill",
            "multiblocks/bloomery",
            "multiblocks/centrifuge",
            "multiblocks/chemical_reactor",
            "multiblocks/coredrill",
            "multiblocks/crystallizer",
            "multiblocks/foundry",
            "multiblocks/geothermal_exchanger",
            "multiblocks/gravity_separator",
            "multiblocks/pelletizer",
            "multiblocks/reverberation_furnace",
            "multiblocks/rotary_kiln",
            "multiblocks/small_chemical_reactor",
            "multiblocks/steam_turbine"
        ]
    }
    
    let namespace = event.getMultiblock().getUniqueName().namespace;
    let multiblock = event.getMultiblock().getUniqueName().path;

    if (mbWhitelist[namespace] != null && (
        mbWhitelist[namespace].includes(multiblock) || 
        mbWhitelist[namespace].length == 0)
    ) {}
    else {
        event.setCanceled(true)
        console.error("Multiblock not allowed! " + event.getMultiblock().getUniqueName())
        event.getEntity().setStatusMessage(Text.red("Multiblock not allowed!"))
    }
        
}