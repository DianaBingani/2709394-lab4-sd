function searchCountry() {
    const country = document.querySelector("#inputCountry").value;
    console.log(country);

    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json()) // Convert the response to JSON 
        .then(data => {
            if(!data?.status){

            
            console.log(data); // Log the data to the console 
            const capital = data[0].capital;
            console.log(capital);
            document.querySelector("p").textContent = `Capital: ${capital}`;
            const population = data[0].population;
            console.log(population);
            document.querySelector("#popu").textContent = `Population: ${population}`
            const flag = data[0].flags.png;
            console.log(flag);
            document.querySelector("#countryImage").src = flag;
            data[0].borders.forEach(e => {

                fetch(`https://restcountries.com/v3.1/alpha/${e}`)
                    .then(response => response.json())
                    .then(n => {
                        const countryName = n[0].name.common
                        console.log(countryName)
                        
                        const countryFlag = n[0].flags.png
                        console.log(countryFlag)
                        const pHtml = document.createElement("p")
                        pHtml.textContent = countryName
                        document.querySelector("#bordering-countries").appendChild(
                        pHtml
                        )

                        const imageHtml = document.createElement("img")
                        imageHtml.src = countryFlag
                        document.querySelector("#bordering-countries").appendChild(
                        imageHtml
                        )
                    });
            });

            document.querySelector("#country-info").style.display = "block"
            document.querySelector("#bordering-countries").style.display = "block"
            document.querySelector("#error").style.display = "none"
            }

            else{
                document.querySelector("#country-info").style.display = "none"
                document.querySelector("#bordering-countries").style.display = "none"
                document.querySelector("#error").style.display = "block"
            }
        }).catch(error => {
            console.error('Error:', error); // Handle any errors 
        });

}