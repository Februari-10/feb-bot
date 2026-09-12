export async function getLtcPrice(): Promise<number> {
    const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd",
    );

    if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    return data.litecoin.usd;
}