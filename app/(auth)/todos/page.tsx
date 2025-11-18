import generateDynamicMetadata from '@/utils/metaDataUtils';
import { Metadata } from 'next';
import TodosView from './TodosView';

export const generateMetadata = async (): Promise<Metadata> =>
    await generateDynamicMetadata({ title: "Todos" });

const Todos = () => {
    return (
        <TodosView />
    )
}

export default Todos