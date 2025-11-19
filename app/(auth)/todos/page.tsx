import generateDynamicMetadata from '@/utils/metaDataUtils';
import { Metadata } from 'next';
import TodosView from './TodosView';

export async function generateMetadata(): Promise<Metadata> {
    return generateDynamicMetadata({ title: "Todos" });
}

const Todos = () => {
    return (
        <TodosView />
    )
}

export default Todos;
