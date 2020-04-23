const fetch = require(`node-fetch`)

async function search() {
    return await fetch(`https://assets.breatheco.de/apis/fake/zips.php`)
        .then(response => {
            return response.json();
        }).then((jsonResponse) => {
            return jsonResponse
            // if (jsonResponse.businesses) {
            // return jsonResponse.businesses.map(business => {
            //     console.log(business)
            //     return {
            //         id: business.id,
            //         imageSrc: business.image_url,
            //         name: business.name,
            //         address: business.location.address1,
            //         city: business.location.city,
            //         state: business.location.state,
            //         zipCode: business.location.zip_code,
            //         category: business.categories[0].title,
            //         rating: business.rating,
            //         reviewCount: business.review_count
            //     }
            // });
            // }
        })
}


search().then(data => console.log(data))