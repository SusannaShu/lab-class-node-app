//import  the express library 
import express from 'express'; 

// creating an instance of an express application
const app = express(); 

// defining the port we want to listen on 
const port = process.env.PORT || 3001

const pets = {
    dog: {
        fur: "short"
    },
    cat: {
        fur: "long"
    },
    hamster: {
        fur: "short"
    },
    rabbit: {
        fur: "long"
    }
}

// setting up a response for the root path of our application
app.get('/',(req,res) => {
    const requestedFur = req.query.fur; 
    const matchingPets = []; 

    for(const pet in pets){
        if(pets[pet].fur == requestedFur){
            matchingPets.push(pet)
        }
    }
    
    console.log(matchingPets)

    if (matchingPets.length > 0) {
        res.send(`Pets with ${requestedFur} fur: ${matchingPets.join(', ')}`);
    } else {
        res.status(404).send(`No pets found with ${requestedFur} fur.`);
    }
})

app.get('/pet/:pet', (req, res) => {
    const requestedPet = req.params.pet.toLowerCase();
    
    if (pets[requestedPet]) {
        res.json({
            pet: requestedPet,
            fur: pets[requestedPet].fur,
            message: `The ${requestedPet} has ${pets[requestedPet].fur} fur.`
        });
    } else {
        res.status(404).json({
            message: `Sorry, we don't have information about ${requestedPet}s.`
        });
    }
})

// setting up our application to listen to the port we defined above
app.listen(port, () => {
    console.log(`Pet information app is listening on port ${port}`)
})
