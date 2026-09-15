<script>
    // @ts-nocheck

    import { onMount } from "svelte";

    /** @type {Array<{review_year?: string, review_quarter?: string}> | null} */
    let data = $state(null);
    let dates = $state(null);

    onMount(async () => {
        try {
            const res = await fetch("http://localhost:3000/v1/get_all_dates"); // change to something else like here i get all available archives shit sorted by year, then bla blabla
            data = await res.json();
            // console.log("data");
            // console.log(data);
            // console.log("data");
            findUniques(data)
        } catch (e) {
            console.log("error:", e);
            
        }
    });
    function findUniques(data) {
        // console.log("data");
        // console.log(data);
        // console.log("data");
        
        // const years = []
        // const quarter = []

        // data.forEach(item => {
        //     if (!years.includes(item.review_year)) {
        //         years.push(item.review_year)
        //     }
        //     if ()
        // })
        
        /**
         * strukturen jag vill ha
         * [year: [q1,q2,q3,q4]]
        */
    //    const dates = [
    //     {
    //         year:"2026",
    //         quarters: []
    //     }
    //    ]
        dates = []
        let dateObj = {
            year: "",
            quarters: []
        }
        console.log("data");
        console.log(data);
        
        data.forEach(item => {
            // console.log("item");
            // console.log(item.review_quarter);
            // console.log(item.review_year);
            // console.log(dateObj.year !== "" && dateObj.year !== item.review_year);
            // console.log( dateObj.year !== item.review_year);
            // console.log(dateObj.year !== "");
            // console.log("------------------------------");
            
            if (dateObj.year !== item.review_year && dateObj.year !== "") {
                console.log(dateObj + " end");

                dates.push(dateObj)
                dateObj = {
                    year: "",
                    quarters: []
                }
            }
            dateObj.year = item.review_year
            // console.log(dateObj);
            

            
            if (!dateObj.quarters.includes(item.review_quarter)) {
                dateObj.quarters.push(item.review_quarter)
                console.log(dateObj); console.log("hahaha------------");
                
                
            }
        })
        dates.push(dateObj  )
        console.log(dates);
    }
    
</script>

{#each dates as date}
    <h3 class="year">{date.year}</h3>
    <div class="divider"></div>
    <div class="quarters">

        {#each date.quarters as quarter}
        <li><a href="/archive/{date.year}/{quarter}">Q{quarter}</a></li>
        {/each}
    </div>
{/each}
