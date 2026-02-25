classDiagram
direction BT
class amenities {
   timestamp createdAt
   timestamp updatedAt
   text name
   text subtitle
   text description
   double precision x
   double precision y
   uuid project_id
   uuid thumbnail_asset_id
   uuid forward_asset_id
   uuid reverse_asset_id
   uuid side_asset_id
   uuid id
}
class assets {
   timestamp createdAt
   timestamp updatedAt
   varchar assetKey
   assets_type_enum type
   text url
   jsonb metadata
   boolean isActive
   varchar tag
   uuid developer_id
   uuid id
}
class blocks {
   timestamp createdAt
   timestamp updatedAt
   text display_name
   double precision x
   double precision y
   uuid property_id
   uuid id
}
class developers {
   timestamp createdAt
   timestamp updatedAt
   varchar name
   varchar email
   varchar specialization
   varchar department
   integer yearsOfExperience
   boolean isActive
   text bio
   uuid id
}
class features {
   timestamp createdAt
   timestamp updatedAt
   text name
   text subtitle
   text description
   double precision x
   double precision y
   uuid floor_id
   uuid property_id
   uuid thumbnail_asset_id
   uuid forward_asset_id
   uuid reverse_asset_id
   uuid side_asset_id
   uuid id
}
class floors {
   timestamp createdAt
   timestamp updatedAt
   integer floor_number
   uuid property_id
   uuid id
}
class projects {
   timestamp createdAt
   timestamp updatedAt
   text name
   uuid developer_id
   uuid intro_asset_id
   uuid idle_asset_id
   uuid zoomout_asset_id
   uuid zones_zoomout_video_id
   uuid zones_forward_video_id
   uuid zones_reverse_video_id
   uuid zones_side_video_id
   jsonb zones_metadata
   uuid id
}
class properties {
   timestamp createdAt
   timestamp updatedAt
   text name
   text type
   text description
   double precision x
   double precision y
   uuid zone_id
   uuid highlight_asset_id
   uuid forward_asset_id
   uuid reverse_asset_id
   uuid side_asset_id
   uuid id
}
class property_views {
   timestamp createdAt
   timestamp updatedAt
   text name
   uuid property_id
   uuid forward_asset_id
   uuid reverse_asset_id
   uuid side_asset_id
   uuid id
}
class surroundings {
   timestamp createdAt
   timestamp updatedAt
   uuid project_id
   text name
   text description
   double precision x
   double precision y
   uuid icon_asset_id
   uuid thumbnail_asset_id
   uuid forward_asset_id
   uuid reverse_asset_id
   uuid side_asset_id
   double precision distance
   text svg
   uuid id
}
class units {
   timestamp createdAt
   timestamp updatedAt
   text unit_code
   text visual_type_id
   uuid property_id
   uuid floor_id
   uuid balcony_asset_id
   uuid forward_asset_id
   uuid reverse_asset_id
   uuid side_asset_id
   text display_name
   text unit_type_id
   numeric(10,2) price
   numeric(8,2) area
   integer bedrooms
   integer bathrooms
   text balcony_view
   numeric(10,2) x
   numeric(10,2) y
   uuid block_id
   uuid id
}
class users {
   timestamp createdAt
   timestamp updatedAt
   varchar email
   varchar password
   varchar name
   users_role_enum role
   boolean isActive
   boolean isEmailVerified
   uuid developer_id
   uuid id
}
class zones {
   timestamp createdAt
   timestamp updatedAt
   text name
   text subtitle
   text description
   double precision x
   double precision y
   uuid project_id
   uuid thumbnail_asset_id
   uuid highlight_asset_id
   uuid forward_asset_id
   uuid reverse_asset_id
   uuid side_asset_id
   uuid zoomout_asset_id
   uuid id
}

amenities  -->  assets : thumbnail_asset_id:id
amenities  -->  assets : forward_asset_id:id
amenities  -->  assets : reverse_asset_id:id
amenities  -->  assets : side_asset_id:id
amenities  -->  projects : project_id:id
assets  -->  developers : developer_id:id
blocks  -->  properties : property_id:id
features  -->  floors : floor_id:id
features  -->  properties : property_id:id
floors  -->  properties : property_id:id
projects  -->  assets : zones_zoomout_video_id:id
projects  -->  assets : zones_forward_video_id:id
projects  -->  assets : zoomout_asset_id:id
projects  -->  assets : idle_asset_id:id
projects  -->  assets : intro_asset_id:id
projects  -->  assets : zones_side_video_id:id
projects  -->  assets : zones_reverse_video_id:id
projects  -->  developers : developer_id:id
properties  -->  assets : highlight_asset_id:id
properties  -->  assets : reverse_asset_id:id
properties  -->  assets : side_asset_id:id
properties  -->  assets : forward_asset_id:id
properties  -->  zones : zone_id:id
property_views  -->  assets : side_asset_id:id
property_views  -->  assets : reverse_asset_id:id
property_views  -->  assets : forward_asset_id:id
property_views  -->  properties : property_id:id
surroundings  -->  assets : forward_asset_id:id
surroundings  -->  assets : thumbnail_asset_id:id
surroundings  -->  assets : icon_asset_id:id
surroundings  -->  assets : reverse_asset_id:id
surroundings  -->  assets : side_asset_id:id
surroundings  -->  projects : project_id:id
units  -->  assets : forward_asset_id:id
units  -->  assets : balcony_asset_id:id
units  -->  assets : side_asset_id:id
units  -->  assets : reverse_asset_id:id
units  -->  blocks : block_id:id
units  -->  floors : floor_id:id
units  -->  properties : property_id:id
users  -->  developers : developer_id:id
zones  -->  assets : side_asset_id:id
zones  -->  assets : reverse_asset_id:id
zones  -->  assets : zoomout_asset_id:id
zones  -->  assets : forward_asset_id:id
zones  -->  assets : highlight_asset_id:id
zones  -->  assets : thumbnail_asset_id:id
zones  -->  projects : project_id:id
