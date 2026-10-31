
const roughconsolidatedtable = (
    doc,
    selectedMachinery,
    currentY,
    pageState = null,
    controlPanel=null,

) =>{
    const left = 50;
    const contentwidth = doc.page.width -100;
    const columns =[
        {label:"section" , width:35},
        {label:"Description", width:170},
        {label:"HP/Model", width:85},
        {label:"qty",width:55},
        {label:"Total Price", width:105},
    ];

    const tablewidth = columns.reduce((total,column)=>total + column.width,0);
    const scale = contentwidth / tablewidth;
    columns.forEach((column)=>{
        column.width *=scale;
    });
    const formatprice = (value) => Number( value || 0).toLocaleString("en-IN",{
        minimumFractionDigits:2,
        maximumFractionDigits:2,
    })
    const getsectionletter =(index)=>{
        let number = index +1;
        let label = "";
        while (number >0){
            number -=1;
            label = String.fromCharCode(65 + (number % 26)) + label;
            number =Math.floor(number /26);            
        }
        return label;
    }

    const ensureSpace = (requiredHeight) => {
        if(currentY + requiredHeight > doc.page.height -55){
            if (pageState?.startNewPage){
                pageState.startNewPage();
                currentY = pageState.getContentStartY
                ? pageState.getContentStartY()
                : 125;
            }
        }
    }

    const drawRow = (values, options ={}) => {
        const {header =false, bold = false, fill = false}= options;
        const padding = 6;
        doc.font(header || bold ? "Helvetica-Bold" : "Helvetica").fontSize(9);
        const textHeight = Math.max(
            ...values.map((value, index)=>
                doc.heightofString(String(value ?? "-"),{
                    width: columns[index].width - padding *2,
    
                })
            )
        )
        const rowHeight = Math.max(header ? 30 : 25, textHeight + padding * 2);
            ensureSpace(rowHeight);
        if (fill){
            doc.save();
            doc.fillColor("#f0f0f0").rect(left, currentY, contentwidth, rowHeight).fill();
            doc.restore();
        }
        let x = left;
        columns.forEach((column, index) =>{
            doc.save();
            doc.linewidth(0.6).strokeColor("#808080");
            doc.rect(x, currentY,column.width, rowHeight).stroke();
            doc.fillColor("#111111");
            doc.font(header ||  bold ? "Helvetica-Bold" : "Helvetica").fontSize(9);
            doc.text(String(values[index] ?? "-"), x + padding, currentY + padding, {
                width: column.width - padding * 2,
                height: rowHeight - padding *2,
                lineGap:4,
            })
            doc.restore();
            x += column.width;
        })
        currentY += rowHeight;
                
    };
    const machinery = Array.isArray(selectedMachinery) ? selectedMachinery : [];
    if (machinery.length === 0) {
        return currentY;
    }
    doc.font("Helvetica-Bold").fontSize(13).fillColor("#3F5F9B");
    doc.text("consolidated pricing summary", left, currentY , {
        width: contentwidth,
    });

    currentY = doc.y + 12;
    drawRow(columns.map((column) => column.label), { header: true, fill: true});
        let grandTotalHp = 0;
        let grandTotalQty =0;
        let grandTotalPrice = 0;
        machinery.forEach((item, index) => {
            const model = item.quotationModel || {};
            const category = item.category || {};
            const pricingRows = Array.isArray(model.pricingRows) ?  model.pricingRows : [];
            let sectionTotalHp = 0;
            let sectionTotalQty = 0;
            let sectionTotalPrice = 0;
            pricingRows.forEach((row)=>{
                const qty = Number(row.qty) || 0;
                const hp = Number (row.hp) || 0;
                const unitPrice = Number(row.unitPrice) || 0;
                const rowTotal = row.totalPrice != null && Number.isFinite(Number(row.totalPrice)) ?
                Number (row.totalPrice) : qty * unitPrice;
                


                
            })

        })





}