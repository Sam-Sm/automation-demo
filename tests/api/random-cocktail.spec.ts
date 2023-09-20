import { test, expect } from '@playwright/test';
import { Cocktail } from '../../types'

test(`Using the Cocktail API to get a random drink`, async ({ request }) => {

    const drinkResponses = await Promise.all([
        await request.get(`${process.env.DEFAULT_API_URL}/json/v1/1/random.php`),
        await request.get(`${process.env.DEFAULT_API_URL}/json/v1/1/random.php`),
        await request.get(`${process.env.DEFAULT_API_URL}/json/v1/1/random.php`),
    ])

    // Check that all the responses were ok
    for(const response of drinkResponses) {
        expect(response.ok()).toBeTruthy()
    }

    const responseJson = await Promise.all(drinkResponses.map(async (response) => await response.json()))

    expect(responseJson.length).toEqual(3)

    const drinkNames = []

    for(const json of responseJson) {
        expect (json.drinks.length).toEqual(1)
        const drink: Cocktail = json.drinks[0]
        expect(drink.strDrink).toBeTruthy()
        expect(drink.strDrinkThumb).toBeTruthy()
        expect(drink.strInstructions).toBeTruthy()
        drinkNames.push(drink.strDrink)
    }

    expect(drinkNames.length).toEqual(3)

    console.info(`[Cocktail API] Got drinks: ${drinkNames.join(', ')}`)
})