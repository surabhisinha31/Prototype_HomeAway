const topics = [
    "signup_req",
    "signup_res",
    "traveler_login_req",
    "traveler_login_res",
    "owner_login_req",
    "owner_login_res",
    "owner_signup_req",
    "owner_signup_res",
    "update_profile_req",
    "update_profile_res",
    "fetch_profile_req",
    "fetch_profile_res",
    "property_search_req",
    "property_search_res",
    "owner_authentication_req",
    "owner_authentication_res",
    "property_post_req",
    "property_post_res",
    "upload_profilepic_req",
    "upload_profilepic_res",
    "property_booking_req",
    "property_booking_res",
    "traveler_dashboard_req",
    "traveler_dashboard_res",
    "owner_dashboard_req",
    "owner_dashboard_res",
    "updatedowner_dashboard_req",
    "updatedowner_dashboard_res",
    "filter_traveler_dashboard_req",
    "filter_traveler_dashboard_res"
];

exports.CONNECTIONPOOL_IMP = false;
exports.CONNECTIONPOOL_MONGO = false;
exports.POOL_LIMIT = 20;


exports.getTopicList = function (){
  return topics;
}
