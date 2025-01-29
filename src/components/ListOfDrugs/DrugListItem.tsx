import { Drug } from './type';
import './listOfDrugs.css';

type Props = {
    drug: Drug;
    onClick: () => void;
};

export const DrugListItem = ({ drug, onClick }: Props) => {
    const { brandName, genericName, productType, route, substanceName } = drug;
    return (
        <li onClick={onClick} className="drug-list-item">
            <p className="item">
                <span className="type">Brand Name:</span>
                <span className="description">{brandName}</span>
            </p>
            <p className="item">
                <span className="type">Generic Name:</span>
                <span className="description">{genericName}</span>
            </p>
            <p className="item">
                <span className="type">Product Type:</span>
                <span className="description">{productType}</span>
            </p>
            <p className="item">
                <span className="type">Route:</span>
                <span className="description"> {route}</span>
            </p>
            <p className="item">
                <span className="type">Substance Name:</span>
                <span className="description"> {substanceName}</span>
            </p>
        </li>
    );
};
