var request = require('request');

//////////////////////////////////////////////////
// OPTIONS FOR HTTP PUT 
// Purpose:    Used to create an index called hotels
//////////////////////////////////////////////////
var optionsPUT = {
    url: 'https://terkaly.search.windows.net/indexes/hotels?api-version=2014-07-31-Preview',
    method: 'PUT',
    json: true,
    headers: {
        'api-key': 'B7D12B8CA3D018EC09C754F95CA552D2',
        'Content-Type': 'application/json'
    },
    body: {
        "name": "hotels",
        "fields": [
          { "name": "hotelId", "type": "Edm.String", "key": true, "searchable": false },
          { "name": "baseRate", "type": "Edm.Double" },
          { "name": "description", "type": "Edm.String", "filterable": false, "sortable": false, "facetable": false, "suggestions": true },
          { "name": "hotelName", "type": "Edm.String", "suggestions": true },
          { "name": "category", "type": "Edm.String" },
          { "name": "tags", "type": "Collection(Edm.String)" },
          { "name": "parkingIncluded", "type": "Edm.Boolean" },
          { "name": "smokingAllowed", "type": "Edm.Boolean" },
          { "name": "lastRenovationDate", "type": "Edm.DateTimeOffset" },
          { "name": "rating", "type": "Edm.Int32" },
          { "name": "location", "type": "Edm.GeographyPoint" }
        ]
    }
};



//////////////////////////////////////////////////
// OPTIONS FOR HTTP POST 
// Purpose: Used to insert data   
//////////////////////////////////////////////////

var optionsPOST = {
    url: 'https://terkaly.search.windows.net/indexes/hotels/docs/index?api-version=2014-07-31-Preview',
    method: 'POST',
    json: true,
    headers: {
        'api-key': 'B7D12B8CA3D018EC09C754F95CA552D2',
        'Content-Type': 'application/json'
    },
    body: {
        "value": [
        {
            "@search.action": "upload",
            "hotelId": "1",
            "baseRate": 199.0,
            "description": "Best hotel in town",
            "hotelName": "Fancy Stay",
            "category": "Luxury",
            "tags": ["pool", "view", "wifi", "concierge"],
            "parkingIncluded": false,
            "smokingAllowed": false,
            "lastRenovationDate": "2010-06-27T00:00:00Z",
            "rating": 5,
            "location": { "type": "Point", "coordinates": [-122.131577, 47.678581] }
        },
          {
              "@search.action": "upload",
              "hotelId": "2",
              "baseRate": 79.99,
              "description": "Cheapest hotel in town",
              "hotelName": "Roach Motel",
              "category": "Budget",
              "tags": ["motel", "budget"],
              "parkingIncluded": true,
              "smokingAllowed": true,
              "lastRenovationDate": "1982-04-28T00:00:00Z",
              "rating": 1,
              "location": { "type": "Point", "coordinates": [-122.131577, 49.678581] }
          },
          {
              "@search.action": "upload",
              "hotelId": "3",
              "baseRate": 279.99,
              "description": "Surprisingly expensive",
              "hotelName": "Dew Drop Inn",
              "category": "Bed and Breakfast",
              "tags": ["charming", "quaint"],
              "parkingIncluded": true,
              "smokingAllowed": false,
              "lastRenovationDate": null,
              "rating": 4,
              "location": { "type": "Point", "coordinates": [-122.33207, 47.60621] }
          },
          {
              "@search.action": "upload",
              "hotelId": "4",
              "baseRate": 220.00,
              "description": "This could be the one",
              "hotelName": "A Hotel for Everyone",
              "category": "Basic hotel",
              "tags": ["pool", "wifi"],
              "parkingIncluded": true,
              "smokingAllowed": false,
              "lastRenovationDate": null,
              "rating": 4,
              "location": { "type": "Point", "coordinates": [-122.12151, 47.67399] }
          }
        ]
    }
};

//////////////////////////////////////////////////
// OPTIONS FOR HTTP GET 
// Purpose:    Used to do a perform a query
//////////////////////////////////////////////////

var optionsGET = {
    url: 'https://terkaly.search.windows.net/indexes/hotels/docs?search=motel&facet=category&facet=rating,values:1|2|3|4|5&api-version=2014-07-31-Preview',
    method: 'GET',
    json: true,
    headers: {
        'api-key': 'B7D12B8CA3D018EC09C754F95CA552D2',
        'Content-Type': 'application/json'
    },
    body: {
    }
};
request(optionsPUT, callbackPUT);

//////////////////////////////////////////////////
// Purpose:    Used to create an index
// Http Verb:  PUT
// End Result: Defines an index using the fields 
// that make up the index definition.
//////////////////////////////////////////////////
function callbackPUT(error, response, body) {
    if (!error) {
        
        try {
            if (response.statusCode === 204) {
                console.log('***success in callbackPUT***');
                request(optionsPOST, callbackPOST);
            }
        } catch (error2) {
            console.log('***Error encountered***');
            console.log(error2);
        }

    } else {
        console.log('error');
        console.log(error);
    }

}

 
//////////////////////////////////////////////////
// Purpose:    Used to insert data
// End Result: Inserts a document
//////////////////////////////////////////////////
function callbackPOST(error, response, body) {
    if (!error) {
        
        try {
            var result = response.request.response.statusCode;
            if (result === 200) {
                console.log('***success in callbackPOST***');
                console.log("The statusCode = " + result);
                // Perform a query
                request(optionsGET, callbackGET);
            }
        } catch (error2) {
            console.log('***Error encountered***');
            console.log(error2);
        }

    } else {
        console.log('error');
        console.log(error);
    }
}
//////////////////////////////////////////////////////////////
// Purpose:    Used to retrieve information
// Http Verb:  GET
// End Result: Query searches on the term "motel" and retrieves 
// facet categories for ratings.
//////////////////////////////////////////////////////////////
function callbackGET(error, response, body) {
    if (!error) {
        try {
            var result = response.request.response.statusCode;
            if (result === 200) {
                result = body.value[0];
                console.log('description = ' + result.description);
                console.log('hotel name = ' + result.hotelName);
                console.log('hotel rate = ' + result.baseRate);
            }
            console.log('***success***');
        } catch (error2) {
            console.log('***Error encountered***');
            console.log(error2);
        }

    } else {
        console.log('error');
        console.log(error);
    }

}

