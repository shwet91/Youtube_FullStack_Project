

const formFetch= async({url , data , method}) => {

    try {

        const fetchOptions = {
            method ,
            body : data,
            headers: {} ,
            credentials: 'include', 
        }
        
        const response = await fetch(url , fetchOptions);

        if(!response.ok){
            throw new Error(` OOO  HTTP error! status: ${response.status}, message: ${response.statusText} , the response is : ${response}`)
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        } else {
          return await response.text();
        }


    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export {formFetch}