export const degreeToRadian = (degree: number) => {
    return degree * (Math.PI / 180)
}

export function checkIfNight() {
    const date = new Date();
    const hour = date.getHours();
    // Malam jika jam lebih dari 18:00 (6 PM) atau sebelum 5:00 (5 AM)
    return hour >= 18 || hour < 5;
}


export function cls(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}