package wpl.spring.dao;

import java.util.List;

import wpl.spring.entity.Inventory;
import wpl.spring.entity.registryItem;

public interface IRegistryDAO {

	public void addItem(registryItem ri);

	public void updateItem(registryItem update);

	public void removeItem(registryItem remove);

	public List<Inventory> searchItem(Inventory search);

}
