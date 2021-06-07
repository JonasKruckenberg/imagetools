import { GetParam } from "../types"

export const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'] as const

export type KernelValue = typeof kernelValues[number]

export const getKernel: GetParam<'kernel', KernelValue> = ({ kernel }) => {
    if (kernel && kernelValues.includes(kernel as KernelValue)) {
        return kernel as KernelValue
    }
}