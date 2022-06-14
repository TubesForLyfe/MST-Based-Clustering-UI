export const minDomainX = (arr: any) => {
    let min = arr[0][0].x;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].x < min) {
                min = arr[i][j].x;
            }
        }
    }
    return Math.floor(min/10) * 10;
}

export const maxDomainX = (arr: any) => {
    let max = arr[0][0].x;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].x > max) {
                max = arr[i][j].x;
            }
        }
    }
    return (Math.floor(max/10) + 1) * 10;
}

export const minDomainY = (arr: any) => {
    let min = arr[0][0].y;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].y < min) {
                min = arr[i][j].y;
            }
        }
    }
    return Math.floor(min/10) * 10;
}

export const maxDomainY = (arr: any) => {
    let max = arr[0][0].y;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].y > max) {
                max = arr[i][j].y;
            }
        }
    }
    return (Math.floor(max/10) + 1) * 10;
}