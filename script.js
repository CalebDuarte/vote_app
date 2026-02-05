//stores votes in array

let votes = [];

//available options(pre defined)

const options=['yes','no','maybe'];

//function to handle voting

function vote(choice){
    votes.push(choice);
    console.log('votes array ' + votes);
    updateResults();
    updateVoteList();
}

//function updateResults

function updateResults(){
    const resultDiv = document.getElementById('results');
    if (votes.length === 0){
        resultDiv.innerHTML =  `
                                <h2> Results </h2>
                                <p class = "no-votes"> No votes yet. Cast Vote
            `;
        return;
    }
//get two seperate arrays 
    const [voteOptions,voteCounts]=countVotes(votes);
    let html = `<h2> Results </h2>`;
    let index = 0;
    //loop through options array using for..of
    for(let option of voteOptions){
        const count = voteCounts[index]; //get count from parallel array

        const percentage = getPercentage(option,votes);

        html+=`
            <div class ="result-item">
            <span class="result-label">${option} ${percentage} </span>
            <span class="result-count">${count}</span>
            </div>
        `;
        index++
    }
    const totalVotes = getTotalVotes(votes);
    html+=`
        <p class ="total-votes"> Total votes : ${totalVotes} </p>
    `;

    resultDiv.innerHTML = html;


}

//function countVotes--count votes using for..of and return two arrays
function countVotes(votesArray){
    //create parallel arrays
    const voteOptions=[];//array of options names
    const voteCounts=[];//array of counts

    //loop through each vote using for..of
    for(let currentVote of votesArray){
        //check if this option exist
        let foundIndex=-1;
        let index =0;
        //search through options array
        for(let option of voteOptions){
            if(option===currentVote){
                foundIndex=index;
                break;
            }
            index++;
        }
        //if found, increment count at that index
        if(foundIndex !== -1){
            voteCounts[foundIndex]++;
        } else{
            //if not found add to both arrays
            voteOptions.push(currentVote);
            voteCounts.push(1);
        }
    }
    //return both arrays
    return[voteOptions, voteCounts];
}

// function to calculate total votes using for..of

function getTotalVotes(votesArray){
    let total = 0;
    for(let vote of votesArray){
        total++;
    }
    return total;
}

//fucntion to get percentage using for..of
function getPercentage(option,votesArray){
    let optionCount = 0;
    let total = 0;
    for(let vote of votesArray){
        total++;
        if(vote === option){
            optionCount++
        }
    }
    if(total===0){
        return 0;
    }
    return ((optionCount / total) *100).toFixed(1);
}
//function to display vote history using for..of loop
function updateVoteList(){
    const  voteListDiv = document.getElementById("voteList");
    const voteItemDiv = document.getElementById("voteItems");
    if(votes.length === 0){
        voteListDiv.style.display ="none";
        return;
    }
    voteListDiv.style.display = 'block';
    let html = '';
    let count = 0;
    // loop through votes using for of
    for(let vote of votes){
        count++
        html+=`
        <span class = "vote-item"> #️⃣${count}: ${vote} </span>
        `;

        voteItemDiv.innerHTML = html;
    }
}
function resetVotes(){
    votes=[];
    updateResults();
    updateVoteList();
}