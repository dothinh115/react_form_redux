export const mainData = (state = [], action) => {
    //lấy id tự động
    const randomId = maxNumber => {
        let getRandomId = number => {
            let randomId = Math.floor(Math.random() * number);
            return randomId;
        }
        //lấy số random
        let id = getRandomId(maxNumber);
        //tìm xem trong mảng có trùng hay ko, nếu trùng thì tiếp tục gọi hàm lấy số random
        while (state.find(item => item.masv === id) !== undefined) {
            id = getRandomId(maxNumber);
        }
        return id;
    }

    switch(action.type) {
        case "THEM_SV_MOI" : {
            let newObj = {...action.payload, masv: randomId(999999999)};
            state = [...state, newObj];
            return state;
        }
        case "LOAD_DATA" : {
            state = action.payload;
            return state;
        }
        case "XOA_SV": {
            state = state.filter(item => item.masv !== action.payload);
            return state;
        }
        case "SUA_SV": {
            const updateID = action.payload.masv;
            const find = state.findIndex(item => item.masv === updateID);
            const nextState = [...state];
            for (let key in action.payload) {
                if(nextState[find][key] !== action.payload[key]) {
                    nextState[find] = {
                        ...nextState[find],
                        [key]: action.payload[key]
                    }
                }
            }
            return nextState;
        }
        default: return state;
    }
}