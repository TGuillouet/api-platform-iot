<?php

namespace App\Repository;

use App\Entity\Chair;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Chair|null find($id, $lockMode = null, $lockVersion = null)
 * @method Chair|null findOneBy(array $criteria, array $orderBy = null)
 * @method Chair[]    findAll()
 * @method Chair[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChairRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chair::class);
    }

    // /**
    //  * @return Chair[] Returns an array of Chair objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Chair
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
