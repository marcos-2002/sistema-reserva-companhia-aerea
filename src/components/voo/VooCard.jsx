function VooCard({name, voo}){
    return(
        <div>
            <h4>{name}</h4>
            <p><span>Voo:</span> R${voo}</p>
            <p><span className={`${styles[category.toLowerCase()]}`}></span>{category}</p>
            <div>
                <Link to={`/project/${id}`}>
                    <BsPencil/> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}

export default VooCard;