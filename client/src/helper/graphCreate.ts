import {Moralis} from "moralis";

export type graphObj = {
    month: string, 
    blogPostCount: number
}

type blogPost = {
  [key: string]: any;
}

const getBlogPostData = async(uid: string) => {
    const BlogPost = Moralis.Object.extend("Blogpost");
    const query = new Moralis.Query(BlogPost);
    query.equalTo("user", uid);
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

const dateParser = (blogpost: blogPost) :string => {
    const dateCreatedStr = blogpost.createdAt;
    const dateCreatedDate :number = Date.parse(dateCreatedStr);
    const dateOptions: Intl.DateTimeFormatOptions = {
        month:"long"
    }
    return new Intl.DateTimeFormat('en-US', dateOptions).format(dateCreatedDate)
}
export const bpGraphData = async(uid:string): Promise<Object> => {
    const months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
    const dataReturn : Array<graphObj> = [];
    const monthsArrLen = months.length;
    for (let i = 0; i < monthsArrLen; i++){
        const gObj = {month: months[i], blogPostCount: 0};
        dataReturn.push(gObj)
    }
    dataReturn.forEach((data, _idx) => {
        data.month = months[_idx];
    })
    const userBpData: Array<blogPost>|undefined = await getBlogPostData(uid);
    userBpData?.forEach(bp => {
        const month:string = dateParser(bp);
        dataReturn[months.indexOf(month)].blogPostCount++;
    })
    if (userBpData !== undefined)
        return dataReturn
    return []
}

