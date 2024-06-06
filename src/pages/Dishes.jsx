import React, { useState } from 'react';
import { Container, Heading, VStack, HStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import { useDishes, useAddDish, useUpdateDish, useDeleteDish } from '../integrations/supabase/index.js';

const Dishes = () => {
  const { data: dishes, isLoading, isError } = useDishes();
  const addDish = useAddDish();
  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();
  const toast = useToast();

  const [form, setForm] = useState({ id: null, name: '', country: '', size: '', type: '', price: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updateDish.mutateAsync(form);
      toast({ title: "Dish updated.", status: "success", duration: 2000, isClosable: true });
    } else {
      await addDish.mutateAsync(form);
      toast({ title: "Dish added.", status: "success", duration: 2000, isClosable: true });
    }
    setForm({ id: null, name: '', country: '', size: '', type: '', price: '' });
  };

  const handleEdit = (dish) => {
    setForm(dish);
  };

  const handleDelete = async (id) => {
    await deleteDish.mutateAsync(id);
    toast({ title: "Dish deleted.", status: "success", duration: 2000, isClosable: true });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading dishes.</div>;

  return (
    <Container maxW="container.lg" py={4}>
      <Heading as="h1" mb={4}>Dishes</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} mb={4}>
          <Input placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
          <Input placeholder="Country" name="country" value={form.country} onChange={handleChange} required />
          <Input placeholder="Size" name="size" value={form.size} onChange={handleChange} required />
          <Input placeholder="Type" name="type" value={form.type} onChange={handleChange} required />
          <Input placeholder="Price" name="price" value={form.price} onChange={handleChange} required />
          <Button type="submit" colorScheme="teal">{form.id ? 'Update Dish' : 'Add Dish'}</Button>
        </VStack>
      </form>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Country</Th>
            <Th>Size</Th>
            <Th>Type</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dishes.map((dish) => (
            <Tr key={dish.id}>
              <Td>{dish.name}</Td>
              <Td>{dish.country}</Td>
              <Td>{dish.size}</Td>
              <Td>{dish.type}</Td>
              <Td>{dish.price}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" onClick={() => handleEdit(dish)}>Edit</Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(dish.id)}>Delete</Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Dishes;