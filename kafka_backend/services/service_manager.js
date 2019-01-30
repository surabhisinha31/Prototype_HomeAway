// var carservices = require('./car_services');
// var flightservices = require('./flight_services');
// var hotelservices = require('./hotel_services');
var userservices = require('./user_services');
var propertyservices = require('./propertypost_services');
var bookingservices = require('./booking_services');
var dashboardservices = require('./dashboard_services');
// var adminservices = require('./admin_services');

function handle_request(topic, data, callback){
    console.log("[Kafka] handle_request topic: "+topic+" ,data: ",data);
    if(topic === "signup_req"){
      userservices.addUser(data, callback);
    }else if(topic === "traveler_login_req"){
      userservices.loginUser(data, callback);
    }else if(topic === "update_profile_req"){
      userservices.updateUser(data, callback);
    }else if(topic === "fetch_profile_req"){
      userservices.getUser(data, callback);
    }else if(topic === "property_search_req"){
    	propertyservices.searchProperty(data,callback);
    }else if(topic === "owner_authentication_req"){
    	propertyservices.ownerAuthentication(data,callback);
    }else if(topic === "property_post_req"){
    	propertyservices.postProperty(data,callback);
    }else if(topic === "property_booking_req"){
      bookingservices.propertyBooking(data, callback);
    }else if(topic === "traveler_dashboard_req"){
      dashboardservices.travelerDashboard(data, callback);
    }else if(topic === "owner_dashboard_req"){
      dashboardservices.ownerDashboard(data, callback);
    }else if(topic === "updatedowner_dashboard_req"){
      dashboardservices.updatedownerDashboard(data, callback);
    }else if(topic === "owner_login_req"){
        userservices.loginOwner(data, callback);
    }else if(topic === "owner_signup_req"){
        userservices.addOwner(data, callback);
    }else if(topic === "filter_traveler_dashboard_req"){
      dashboardservices.filterTravelerDashboard(data, callback);
    }else if(topic === "admin_hotel_bill_req"){
      adminservices.adminHotelBilling(data, callback);
    }else if(topic === "hotel_search_admin_req"){
      hotelservices.searchHotelsAdmin(data, callback);
    }else if(topic === "hotel_update_admin_req"){
      hotelservices.updateHotelAdmin(data, callback);
    }else if(topic === "car_search_admin_req"){
      carservices.searchCarsAdmin(data, callback);
    }else if(topic === "car_update_admin_req"){
      carservices.updateCarAdmin(data, callback);
    }else if(topic === "flight_search_admin_req"){
      flightservices.searchFlightsAdmin(data, callback);
    }else if(topic === "flight_update_admin_req"){
      flightservices.updateFlightAdmin(data, callback);
    }else if(topic === "admin_signin_req"){
        adminservices.adminSignIn(data, callback);
    }else if(topic === "admin_hotel_bill_req"){
        adminservices.adminHotelBilling(data, callback);
    }else if(topic === "car_book_req"){
        carservices.bookCar(data, callback);
    }else if(topic === "flight_book_req"){
        flightservices.bookFlight(data, callback);
    }else if(topic === "hotel_book_req") {
        hotelservices.bookHotel(data, callback);
    }else if(topic === "admin_car_bill_req"){
      adminservices.adminCarBilling(data, callback);
    }else if(topic === "admin_flight_bill_req"){
      adminservices.adminflightBilling(data, callback);
    }else if(topic === "admin_total_sales_req"){
      adminservices.adminTotalSalesAnalysis(data, callback);
    }else if(topic === "delete_hotel_req"){
      hotelservices.deleteHotel(data, callback);
    }
    else if(topic === "add_user_req"){
      userservices.addUserAdmin(data, callback);
    }
    else if(topic === "search_user_req"){
      userservices.searchUserAdmin(data, callback);
    }
    else if(topic === "update_user_req"){
      userservices.updateUserAdmin(data, callback);
    }
    else if(topic === "delete_user_req"){
      userservices.deleteUserAdmin(data, callback);
    }else if(topic === "admin_details_req"){
      adminservices.adminDetails(data, callback);
    }else if(topic === "update_admin_req"){
      adminservices.updateAdminDetails(data, callback);
    }else if(topic === "signin_req"){
      userservices.searchUserAdmin(data, callback);
    }else if(topic === "getuser_details_req"){
        userservices.getuserdetails(data, callback);
    }else if(topic === "edituser_details_req"){
        userservices.edituserdetails(data, callback);
    }else if(topic === "editcard_details_req"){
        userservices.editcarddetails(data, callback);
    }else if(topic === "addcard_details_req"){
        userservices.addcarddetails(data, callback);
    }else if(topic === "deleteuser_req"){
        userservices.deleteuser(data, callback);
    }else if(topic === "getcard_details_req"){
        userservices.getcarddetails(data, callback);
    }else if(topic === "getuser_history_req"){
        userservices.getuserhistory(data, callback);
    }else if(topic === "get_user_card_details_req"){
        userservices.get_user_card(data, callback);
    }else if(topic === "getuserhistoryHotels_req"){
        userservices.getuserhistoryHotels(data, callback);
    }else if(topic === "getuserhistoryCars_req"){
        userservices.getuserhistoryCars(data, callback);
    }else if(topic === "getuserhistoryFlights_req"){
        userservices.getuserhistoryFlights(data, callback);
    }else if(topic === "user_trace_req"){
        adminservices.userTrace(data, callback);
    }

}

exports.handle_request = handle_request;
