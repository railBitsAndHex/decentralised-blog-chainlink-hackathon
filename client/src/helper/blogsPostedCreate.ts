import {Moralis} from "moralis";

export type blogInfo ={
    title: string, 
    dateCreated: string
}
type blogPost = {
  [key: string]: any;
}
const getBlogPostData = async(uid: string) => {
    const BlogPost = Moralis.Object.extend("Blogpost");
    const query = new Moralis.Query(BlogPost);
    query.equalTo("user", uid);
    query.select("title");
    query.select("createdAt")
    try {
        const results = await query.find();
        return results;
    }
    catch(err: unknown){
        if (err instanceof Error) {
            console.log(err.message)
        }
    }
}
export const dateParser = (blogpost: blogPost):string => {
    const dateCreatedDate :number = Date.parse(blogpost.createdAt);
    const dateOptions: Intl.DateTimeFormatOptions = {
        month:"long",
        day: 'numeric',
        year:'numeric'
    }
    return new Intl.DateTimeFormat('en-US', dateOptions).format(dateCreatedDate)
}
export const bpTableData = async(uid: string): Promise<Object> =>{
    const dataReturn : Array<blogInfo> = [];
    const userBpData: Array<blogPost>|undefined = await getBlogPostData(uid);
    userBpData?.forEach(bp => {
        dataReturn.push({
            title: bp.get("title"),
            dateCreated: dateParser(bp)
        })
    })
    if (userBpData !== undefined) 
        return dataReturn;
    return []

}
