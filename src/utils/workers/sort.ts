import { inPlaceSort } from "fast-sort";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

export default function workerSort(array: string[], sortData: Map<string, number>): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, {
            workerData: [array, sortData],
        });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

if (!isMainThread) {
    const arr: string[] = workerData[0];
    const sortData: Map<string, number> = workerData[1];

    inPlaceSort(arr).asc((i) => sortData.get(i));

    parentPort.postMessage(arr);
    process.exit(0);
}
