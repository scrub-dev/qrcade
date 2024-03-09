import Button from "../../core/Button"
import request from "../../util/connection/request"

export default () => {

    const removeAllHits = async () => {
        let res = (await request.delete('admin/clear/allhits')).data
        console.log(res)
        if(res.code == "SUCCESS") alert("All hits have been cleared")
        else alert("There was an error clearing all hits")
    }

    return <Button text="Clear All Hits" onClick={removeAllHits}/>
}