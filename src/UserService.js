import axios from 'axios';

const url = 'https://locusnine-api.herokuapp.com/api/v1/users';

class UserService {
    //get posts
    static async getUsers(sortOrder) {
        try {
            console.log(`${sortOrder}`);
            
            const res = await axios.get(url + '?order=' + sortOrder, { 
                'headers': { 
                    'api-token': 'c890a432-cc28-4e94-b123-f99a10efbb9c',
                    'Access-Control-Allow-Origin': '*'
                } 
            });
            return res.data;
        } catch(err) {
            throw err;
        }
    }

    //get single user record
    static async getSingleUser(userId) {
        try {
            const res = await axios.get(url + '/' + userId, { 
                'headers': { 
                    'api-token': 'c890a432-cc28-4e94-b123-f99a10efbb9c',
                    'Access-Control-Allow-Origin': '*'
                } 
            });
            console.log(`${JSON.stringify(res.data)}`);
            
            return res.data;
        } catch(err) {
            throw err;
        }
    }

    //create user
    static insertUser(name, email, mobile) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'api-token': 'c890a432-cc28-4e94-b123-f99a10efbb9c',
                "Access-Control-Allow-Origin": "*",
            };
            return axios.post(
                url, 
                {
                    name: name,
                    email: email,
                    mobile: mobile,
                    role: "ADMIN",
                    status: "ACTIVE"
                },
                {
                    headers: headers
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateUser(name, email, mobile, role, id) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'api-token': 'c890a432-cc28-4e94-b123-f99a10efbb9c',
                "Access-Control-Allow-Origin": "*",
            };
            return axios.put(
                url, 
                {
                    id: id,
                    name: name,
                    email: email,
                    mobile: mobile,
                    role: role
                },
                {
                    headers: headers
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    //delete posts
    static deleteUser(id) {
        const headers = {
            'Content-Type': 'application/json',
            'api-token': 'c890a432-cc28-4e94-b123-f99a10efbb9c',
            "Access-Control-Allow-Origin": "*",
        };
        return axios.delete(
            url, 
            {
                headers: headers,
                data:{
                    id: id
                }
            }
        );
    }
}

export default UserService;