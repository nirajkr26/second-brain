
export function random(len: number) {
    let options = "sdfwfhwefdfuru8eu8ru238ru82@##$#$@#4dsf38ur8ur4er9ehfwu";

    let length = options.length;

    let ans = "";

    for (let i = 0; i < len; i++) {
        ans += options[Math.floor((Math.random() * length))];
    }

    return ans;
}