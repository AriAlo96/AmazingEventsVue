// import { filterPastEvents } from "../modules/functions.js"
// import { percentageAssistanceMax } from "../modules/functions.js"
// import { nameMaxAssistance } from "../modules/functions.js"
// import { printTable1 } from "../modules/functions.js"
// import { percentageAssistanceMin } from "../modules/functions.js"
// import { nameMinAssistance } from "../modules/functions.js"
// import { largerCapacity } from "../modules/functions.js"
// import { nameLargerCapacitiy } from "../modules/functions.js"
// import { filterUpcomingEvents } from "../modules/functions.js"
// import { categoriesTable } from "../modules/functions.js"
// import { revenueCategory } from "../modules/functions.js"
// import { percentageAssistanceByCategory } from "../modules/functions.js"
// import { printTable2and3 } from "../modules/functions.js"



// let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"

// fetch(URL_API)
//     .then(response => response.json())
//     .then((object) => {
//         let eventsList = object.events
//         let pastEvents = filterPastEvents(eventsList, object)
//         let maxAssistance = percentageAssistanceMax(pastEvents)
//         let nameEventMaxAssistance = nameMaxAssistance(pastEvents, maxAssistance)
//         let minAssistance = percentageAssistanceMin(pastEvents)
//         let nameEventMinAssistance = nameMinAssistance (pastEvents,minAssistance)
//         let eventLargerCapacity = largerCapacity(eventsList)
//         let eventNameLargerCapacity = nameLargerCapacitiy (eventsList,eventLargerCapacity)
//         let bodyTable1 = document.getElementById("body-table-1")
//         printTable1(bodyTable1,nameEventMaxAssistance,maxAssistance,nameEventMinAssistance,minAssistance,eventNameLargerCapacity,eventLargerCapacity)
//         let upcomingEvents = filterUpcomingEvents (eventsList,object)
//         let categoriesUpcoming = categoriesTable (upcomingEvents)
//         let revenuesCategoryUpcoming = revenueCategory (upcomingEvents)
//         let percentageAssistanceUpcoming = percentageAssistanceByCategory (upcomingEvents)
//         let bodyTable2 = document.getElementById("body-table-2")
//         printTable2and3 (bodyTable2,categoriesUpcoming,revenuesCategoryUpcoming,percentageAssistanceUpcoming)
//         let categoriesPast = categoriesTable (pastEvents)
//         let revenuesCategoryPast = revenueCategory (pastEvents)
//         let percentageAssistancePast = percentageAssistanceByCategory (pastEvents)
//         let bodyTable3 = document.getElementById("body-table-3")
//         printTable2and3 (bodyTable3,categoriesPast,revenuesCategoryPast,percentageAssistancePast)
//     })
//     .catch(err => err) 





