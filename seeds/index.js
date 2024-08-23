const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const axios = require('axios');
const { places, descriptors } = require('./seedsHelper');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('Database connected');
}

const sample = array => array[Math.floor(Math.random() * array.length)]
async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'CAgvS4lUZx0BRi4PlRVH7R1OTog6ewXo6sQsEa51ZVg',
                collections: 1114848,
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
}

const seedsDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i <= 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000 + 1);
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground({
            name: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dpbpdevnx/image/upload/v1723625809/yelpCamp2.0/ubt3k82euaczzknllsby.jpg',
                  fileName: 'yelpCamp2.0/ov0iq1exvisgmunkojot',
                },
                {
                  url: 'https://res.cloudinary.com/dpbpdevnx/image/upload/v1723449082/yelpCamp2.0/yyzwpdqjwvilqyejr9nw.jpg',
                  fileName: 'yelpCamp2.0/vj6bsdu05wirhcoe6mfg',
                },
              ],
            author: '66aa0d104fb63d648cfae497',
            price,
            geometry: {
              type : 'Point',
              coordinates : [cities[random1000].longitude, cities[random1000].latitude]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, atque. Ad temporibus sit tenetur numquam possimus recusandae, quibusdam perferendis praesentium impedit consequuntur nulla nam magni assumenda minus, rem voluptatem sunt.',
            location: `${cities[random1000].city} ${cities[random1000].state}`,
        })
        await camp.save();
    }
}

seedsDb().then(() => mongoose.connection.close());