var n=1;
export interface lisofDevices{
    broj:number,
    tip:string,
    ime:string
} 

export var listDevices = [
    {broj:n++ ,tip : "Veš mašina", ime:"Kupatilo"} as lisofDevices,
    {broj:n++ ,tip : "Vox televizor", ime:"Spavaća soba"} as lisofDevices,
    {broj:n++,tip : "Vivax klima", ime:"Dnevna soba"} as lisofDevices,
    {broj:n++ ,tip : "Vox televizor", ime:"Dnevna soba"} as lisofDevices,
    {broj:n++ ,tip : "Beko šporet", ime:"Kuhinja"} as lisofDevices,
    {broj:n++,tip : "Klima", ime:"Spavaca soba"} as lisofDevices,
    {broj:n++ ,tip : "Frižider", ime:"Samsung"} as lisofDevices
]