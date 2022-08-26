const btn=document.querySelector('.changebtn');
const colorGrid=document.querySelector('.colorGrid');
const colorValue=document.querySelector('.colorvalue');

btn.addEventListener('click',async ()=>{
    chrome.storage.sync.get('color',({color})=>
    {
        console.log(color);
    })
    //console.log("Clickedd.....");
    let [tab]=await chrome.tabs.query({active:true, currentWindow:true});
    //console.log(tab);

    chrome.scripting.executeScript({
        target:{tabId: tab.id},
        function: pickColor
    },async(injectionResults)=>{
        const [data]=injectionResults;
        if (data.result)
        {
            const color=data.result.sRGBHex;
            colorGrid.style.backgroundColor=color;
            colorValue.innerText=color;
            try {
                await navigator.clipboard.writeText(color);                
            } catch (err) {
                console.error(er);
            }
            //console.log(colorGrid);
            //console.log(injectionResults);
        }
        //console.log(data)
        
    });

});

async function pickColor()
{
    //console.log('script working');
    try {
        const eyeDropper = new EyeDropper();
        //const selectedcolor=await eyeDropper.open();
        //console.log(selectedcolor)
        return await eyeDropper.open();

    } catch (err) {
        console.error(err);
    }
}
