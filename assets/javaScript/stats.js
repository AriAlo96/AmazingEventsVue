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
                this.categoriesTableUpcoming()
                this.revenuesByCategoryUpcoming()
                this.percentageAssistanceByCategoryUpcoming()
                this.categoriesTablePast()
                this.revenuesByCategoryPast()
                this.percentageAssistanceByCategoryPast()
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
        categoriesTableUpcoming() {
            this.categoriesUpcoming = Array.from(new Set(this.upcomingEvents.map(event => event.category)))
        },
        revenuesByCategoryUpcoming() {
            this.revenuesUpcoming = this.upcomingEvents.reduce((acc, event) => {
                let category = event.category;
                let revenues = (event.price) * (event.estimate || event.assistance);
                acc[category] = (acc[category] ? acc[category] + revenues : revenues);
                return acc
            }, {});
        },
        percentageAssistanceByCategoryUpcoming() {
            this.averageAssistanceByCategoryUpcoming = this.upcomingEvents.reduce((acc, event) => {
                let category = event.category;
                let assistance = ((event.estimate || event.assistance) * 100 / event.capacity);
                acc[category] = acc[category] || {addAssistance: 0, addEventsByCategory: 0}
                acc[category].addAssistance += assistance;
                acc[category].addEventsByCategory ++
                return acc;
            }, {})
            for (let category in this.averageAssistanceByCategoryUpcoming) {
        let { addAssistance, addEventsByCategory } = this.averageAssistanceByCategoryUpcoming[category];
        this.averageAssistanceByCategoryUpcoming[category] = (addAssistance / addEventsByCategory).toFixed(1);
    }
        },
        categoriesTablePast() {
            this.categoriesPast = Array.from(new Set(this.pastEvents.map(event => event.category)))
        },
        revenuesByCategoryPast() {
            this.revenuesPast = this.pastEvents.reduce((acc, event) => {
                let category = event.category;
                let revenues = (event.price) * (event.estimate || event.assistance);
                acc[category] = (acc[category] ? acc[category] + revenues : revenues);
                return acc
            }, {});
        },
        percentageAssistanceByCategoryPast() {
            this.averageAssistanceByCategoryPast = this.pastEvents.reduce((acc, event) => {
                let category = event.category;
                let assistance = ((event.estimate || event.assistance) * 100 / event.capacity);
                acc[category] = acc[category] || {addAssistance: 0, addEventsByCategory: 0}
                acc[category].addAssistance += assistance;
                acc[category].addEventsByCategory ++
                return acc;
            }, {})
            for (let category in this.averageAssistanceByCategoryPast) {
        let { addAssistance, addEventsByCategory } = this.averageAssistanceByCategoryPast[category];
        this.averageAssistanceByCategoryPast[category] = (addAssistance / addEventsByCategory).toFixed(1);
    }
        },
    }
}).mount('#app')


