const defaultData = [];
const updateUserDefault = {};

export const mainData = (state = defaultData, action) => {
    //lấy id tự động
    const randomId = maxNumber => {
        let getRandomId = number => {
            let randomId = Math.floor(Math.random() * number);
            return randomId;
        }
        //lấy số random
        let id = getRandomId(maxNumber);
        //tìm xem trong mảng có trùng hay ko, nếu trùng thì tiếp tục gọi hàm lấy số random
        while (state.find(item => item.masv === id) !== undefined || id.length <= 9) {
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
        default: return  state;
    }
}

export const updateUser = (state = updateUserDefault, action) => {
    switch(action.type) {
        default: return state;
    }
}