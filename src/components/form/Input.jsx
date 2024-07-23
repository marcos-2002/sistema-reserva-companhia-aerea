import styles from './Input.module.css';

function Input({type, name, placeholder, onChange, value, text}){
    return (
        <div className={styles.input}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type} 
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default Input