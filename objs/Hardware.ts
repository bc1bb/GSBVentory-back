interface HardwareObject {
    type: string,
    buyDate: Date,
    serialNumber: string,
    manufacturer: string,
    model: string,
    endOfWarrantyDate: Date,
    internalId: string,
    note: string
}

export default HardwareObject;