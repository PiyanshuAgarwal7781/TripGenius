export  let SelectOptions=[
    {
        id:1,
        title:"Just me",
        desc:"A solo Travel in exploration",
        icon:"✈️",
        people:'1'
    },

    {
        id:2,
        title:"Couple",
        desc:"Two travels in tanden",
        icon:"🥂",
        people:'2'
    },

   { 
    id:3,
    title:"Family",
    desc:"A group of fun loving adv",
    icon:"🏠",
    people:'3 to 5 people'
},
{
    id:4,
    title:"Friends",
    desc:"A brunch of thrill seeks",
    icon:'⛵',
    people:'4-6 people'
}
]

export let budgetList=[
    {
        id:1,
        title:"Cheap",
        desc:"Stay consious of costs",
        icon:"💴"
    },
    {
        id:2,
        title:"Moderate",
        desc:"Keep cost on average side",
        icon:"💰",
    },
    {
        id:3,
        title:"Luxury",
        desc:"Dont worry about cost",
        icon:"💸",   
    }
]

// export let Prompt=`Generate Travel Plan for Location: {location}, for {Total days} Days for a {traveller} with a {budget} budget. Give me the response strictly in raw JSON format only`
//  export let  Prompt ="Generate Travel Plan for Location : {location} for {Total days} Days for a  {traveller} with a {budget} budget, give  me Hotels options list with HotelName, Hotel address, Price,  hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image  Url, Geo Coordinates, ticket Pricing, Time travel each of the  location for days with each day plan with best time to  visit . Give me the response strictly in raw JSON format only.NOTE:Respond with valid JSON only. Do not include any extra explanation or natural language outside the JSON "

export let Prompt = `
Generate Travel Plan for Location: {location} for {Total days} Days for a {traveller} with a {budget} budget.

Give me:
- Hotels options list with: four HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions.
- A detailed itinerary with: placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, time to travel to each location, and best time to visit.
- Each day's plan should contain an array of multiple places (alteast 3).
- Each day's plan should be separated (Day 1, Day 2, etc.)

Give me the response strictly in raw JSON format only.

NOTE: Respond with valid JSON only. Do not include any extra explanation or natural language outside the JSON.
DO NOT change the key names or create your own structure.

Here is the required JSON schema to follow:

{
  "Travel Plan": {
    "Destination": "{location}",
    "Travelers": {traveller},
    "Budget": "{budget}",
    "Days": {Total days},
    "Hotels": [
      {
        "HotelName": "string",
        "HotelAddress": "string",
        "Price": "string",
        "ImageUrl": "string",
        "GeoCoordinates": {
          "Latitude": "string",
          "Longitude": "string"
        },
        "Rating": "string",
        "Description": "string"
      }
    ],
    "Itinerary": {
      "Day1": [
        {
          "Day": "Day 1",
          "PlaceName": "string",
          "PlaceDetails": "string",
          "PlaceImageUrl": "string",
          "GeoCoordinates": {
            "Latitude": "string",
            "Longitude": "string"
          },
          "TicketPricing": "string",
          "TimeToTravel": "string",
          "BestTimeToVisit": "string"
        }
      ],
      "Day2": [
        {
          "Day": "Day 2",
          "PlaceName": "string",
          "PlaceDetails": "string",
          "PlaceImageUrl": "string",
          "GeoCoordinates": {
            "Latitude": "string",
            "Longitude": "string"
          },
          "TicketPricing": "string",
          "TimeToTravel": "string",
          "BestTimeToVisit": "string"
        }
      ]
      // Add Day3 and so on if {Total days} >= 3
    }
  }
}
`;

