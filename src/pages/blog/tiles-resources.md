---
layout: ../../layout/Post.astro
title: 'Resources for WearOS tiles and protolayout'
date: 2026-06-07 12:53:09 -0300
author: 'Clue'
---

Recently, I have been developing WearOS apps. A common element of these apps is tiles: like small screens that do one or more actions.

However, developing these screens is really a pain-in-the-ass. All the resources and things are hidden, which seems to be a common theme with Android documentation. Here I have gathered a few resources for creating tiles.

- Getting started: <https://developer.android.com/training/wearables/tiles/get_started?version=3>
- Dependencies, changelog: <https://developer.android.com/jetpack/androidx/releases/wear-tiles>
- Migration, UI design: <https://developer.android.com/training/wearables/tiles/versioning>
- Basic tile creation (codelab): <https://developer.android.com/codelabs/wear-tiles#2>
- Handling interactions: <https://developer.android.com/codelabs/wear-tiles#8>
- Components: <https://developer.android.com/training/wearables/tiles/versioning#components>
- Example tile: <https://github.com/android/wear-os-samples/tree/main/earTilesKotlin/app/src/main/java/com/example/wear/tiles>
- My template for tiles:

```kt
package org.fgclue.demos.tiles

import android.content.Context
import androidx.wear.protolayout.DeviceParametersBuilders
import androidx.wear.protolayout.DimensionBuilders.expand
import androidx.wear.protolayout.LayoutElementBuilders
import androidx.wear.protolayout.ResourceBuilders
import androidx.wear.protolayout.TimelineBuilders
import androidx.wear.protolayout.material3.MaterialScope
import androidx.wear.protolayout.material3.materialScope
import androidx.wear.protolayout.material3.primaryLayout
import androidx.wear.protolayout.material3.text
import androidx.wear.protolayout.modifiers.padding
import androidx.wear.protolayout.types.layoutString
import androidx.wear.tiles.RequestBuilders
import androidx.wear.tiles.TileBuilders
import androidx.wear.tiles.TileService
import androidx.wear.tiles.tooling.preview.Preview
import androidx.wear.tiles.tooling.preview.TilePreviewData
import androidx.wear.tiles.tooling.preview.TilePreviewHelper
import androidx.wear.tooling.preview.devices.WearDevices
import com.google.common.util.concurrent.Futures
import com.google.common.util.concurrent.ListenableFuture

class GenericTileService : TileService() {
    @Suppress("PropertyName")
    val RESOURCES_VERSION = "type something here!"

    fun tileLayout(
        context: Context,
        deviceConfiguration: DeviceParametersBuilders.DeviceParameters
    ) =
        materialScope(
            context = context,
            deviceConfiguration = deviceConfiguration,
            allowDynamicTheme = false,
        ) {
            primaryLayout(
                titleSlot = {
                    text("My new tile".layoutString)
                },
                mainSlot = {
                    LayoutElementBuilders.Column.Builder()
                        .apply {
                            setWidth(expand())
                            setHeight(expand())
                            addContent(
                                text("Hello, World!".layoutString)
                            )
                        }
                        .build()
                },
            )
        }

    override fun onTileRequest(requestParams: RequestBuilders.TileRequest): ListenableFuture<TileBuilders.Tile> =
        Futures.immediateFuture(
            TileBuilders.Tile.Builder()
                .setResourcesVersion(RESOURCES_VERSION)
                .setTileTimeline(
                    TimelineBuilders.Timeline.fromLayoutElement(
                        tileLayout(this, requestParams.deviceConfiguration)
                    )
                )
                .build()
        )

    @Preview(device = WearDevices.SMALL_ROUND, name = "Small Round")
    @Preview(device = WearDevices.LARGE_ROUND, name = "Large Round")
    @Preview(device = WearDevices.SQUARE, name = "Square")
    internal fun tileLayoutPreview(context: Context): TilePreviewData {
        return TilePreviewData {
            TilePreviewHelper.singleTimelineEntryTileBuilder(
                tileLayout(context, it.deviceConfiguration)
            )
                .build()
        }
    }

    override fun onTileResourcesRequest(requestParams: RequestBuilders.ResourcesRequest): ListenableFuture<ResourceBuilders.Resources> =
        Futures.immediateFuture(
            ResourceBuilders.Resources.Builder().setVersion(RESOURCES_VERSION).build()
        )
}
```
