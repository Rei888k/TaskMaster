import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Task, UpdateTask } from "./interface";

export async function addTask(task: Task) {
    try {
        // ここでidを採番する
        const tasksCollection = collection(db, "tasks");
        // 先に空のドキュメントを作成し、そのIDを取得
        const docRef = doc(tasksCollection);

        task.taskId = docRef.id
        // IDを含むデータを追加
        await setDoc(docRef, task);
        console.log("Document written with ID: ", docRef.id);

        const addedDoc = await getDoc(doc(db, "tasks", docRef.id));

        if (addedDoc.exists()) {
            console.log("Retrieved document data: ", addedDoc.data());
            return addedDoc.data()
        } else {
            console.log("No such document!");
        }
        // return
    } catch (e) {
        console.error("Error adding document: ", e);
        return null
    }
}

export async function getTask() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    
    let tasks : Task[] = []
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        // let jsonString = JSON.stringify(doc.data())
        
        tasks.push(doc.data() as Task)
    });

    console.log(tasks)
    return tasks
}

export async function updateTask(task: UpdateTask) {
    console.log("updatetask", task)
    const taskRef = doc(db, "tasks", task.taskId!.toString());
    await updateDoc(taskRef, task as any);
}

export async function deleteTask(taskId: number) {
    await deleteDoc(doc(db, "tasks", taskId.toString()));
} 1