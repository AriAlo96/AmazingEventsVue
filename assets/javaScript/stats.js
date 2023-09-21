let { createApp } = Vue

createApp({
    data() {
        return {
            eventsList: [],
            pastEvents: [],
            upcomingEvents: [],
            maxAssistance: -Infinity,
            nameMaxAssistance: "",
            minAssistance: Infinity,
            nameMinAssistance: "",
            largerCapacity: -Infinity,
            namelargerCapacity: "",
            categoriesUpcoming: [],
            revenuesUpcoming: 0,
            averageAssistanceByCategoryUpcoming: 0,
            categoriesPast: [],
            revenuesPast: 0,
            averageAssistanceByCategoryPast: 0,
        }
    },
    created() {
        let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"
        fetch(URL_API)
            .then(response => response.json())
            .then((object) => {
                this.eventsList = object.events;
                this.pastEvents = this.eventsList.filter(event => new Date(event.date) < new Date(object.currentDate))
                this.upcomingEvents = this.eventsList.filter(event => new Date(event.date) >= new Date(object.currentDate))
                this.percentageAssistanceMax()
                this.percentageAssistanceMin()
                this.eventLargerCapacity()
                this.categoriesUpcoming = this.categoriesTable2and3(this.upcomingEvents)
                this.revenuesUpcoming = this.revenuesByCategory(this.upcomingEvents)
                this.averageUpcoming = this.averageByCategory(this.upcomingEvents)
                this.categoriesPast = this.categoriesTable2and3(this.pastEvents)
                this.revenuesPast = this.revenuesByCategory(this.pastEvents)
                this.averagePast = this.averageByCategory(this.pastEvents)
            })
            .catch(err => console.log(err))
    },
    methods: {
        percentageAssistanceMax() {
            for (let event of this.pastEvents) {
                let assistance = (event.assistance * 100 / event.capacity).toFixed(1)
                if (assistance >= this.maxAssistance) {
                    this.maxAssistance = assistance;
                    this.nameMaxAssistance = event.name;
                }
            }
        },
        percentageAssistanceMin() {
            for (let event of this.pastEvents) {
                let assistance = (event.assistance * 100 / event.capacity).toFixed(1)
                if (assistance <= this.minAssistance) {
                    this.minAssistance = assistance;
                    this.nameMinAssistance = event.name;
                }
            }
        },
        eventLargerCapacity() {
            for (let event of this.eventsList) {
                let capacity = event.capacity
                if (capacity >= this.largerCapacity) {
                    this.largerCapacity = capacity;
                    this.namelargerCapacity = event.name;
                }
            }
        },
        categoriesTable2and3(events) {
            return Array.from(new Set(events.map(event => event.category)))
        },

        revenuesByCategory(events) {
           return events.reduce((acc, event) => {
                let category = event.category;
                let revenues = (event.price) * (event.estimate || event.assistance);
                acc[category] = (acc[category] ? acc[category] + revenues : revenues);
                return acc
            }, {});
        },
        averageByCategory(events) {
             let additions = events.reduce((acc, event) => {
                let category = event.category;
                let assistance = ((event.estimate || event.assistance) * 100 / event.capacity);
                if (!acc[category]) {
                    acc[category] = {addAssistance: 0, addEventsByCategory: 0};
                }
                acc[category].addAssistance += assistance;
                acc[category].addEventsByCategory ++
                console.log(acc);
                return acc;
                
            }, {})
            for (let category in additions) {
                let categoryData = additions[category];
                let averageAssistance = categoryData.addAssistance / categoryData.addEventsByCategory;
                additions[category] = averageAssistance.toFixed(1);
            }
    return additions;
        },
    
    }
}).mount('#app')


