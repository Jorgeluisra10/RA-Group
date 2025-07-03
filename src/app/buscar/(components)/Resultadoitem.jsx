export default function ResultadoItem({ item, tipo }) {
  return (
    <div className="p-4 border rounded-lg shadow">
      {tipo === "vehiculo" ? (
        <>
          <h2 className="text-lg font-semibold">{item.marca} {item.modelo}</h2>
          <p>${item.precio}</p>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{item.tipo} en {item.ciudad}</h2>
          <p>${item.precio} - {item.habitaciones} habitaciones</p>
        </>
      )}
    </div>
  );
}
